import { NextRequest, NextResponse } from "next/server";

// Lead capture endpoint.
//
// Every lead form on the site POSTs here. Delivery channels are
// configured with environment variables (see .env.example):
//
//   1. LEAD_WEBHOOK_URL — POSTs the lead JSON to any webhook
//      (Zapier, Make, GoHighLevel, Follow Up Boss, a CRM…).
//   2. LEAD_NOTIFY_EMAIL + CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_EMAIL_TOKEN
//      — emails the lead via Cloudflare Email Sending.
//
// If neither is configured the lead is written to the server log
// (visible in Vercel → Logs) so a submission is never silently
// dropped before the channels are wired up.

type Lead = {
  name: string;
  phone?: string;
  email?: string;
  intent: string; // tour | landlord-analysis | hoa-review | hoa-report | seasonal-alert | renter-match | general
  context?: string; // property title, community name, etc.
  message?: string;
  page?: string;
};

function clean(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

async function postJson(url: string, body: unknown, headers: Record<string, string> = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

export async function POST(req: NextRequest) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "company" field.
  // If it's filled, it's a bot — pretend success and drop the lead.
  if (clean(raw.company)) return NextResponse.json({ ok: true });

  const lead: Lead = {
    name: clean(raw.name, 120),
    phone: clean(raw.phone, 40),
    email: clean(raw.email, 160),
    intent: clean(raw.intent, 40) || "general",
    context: clean(raw.context, 200),
    message: clean(raw.message, 1500),
    page: clean(raw.page, 300),
  };

  if (!lead.name || (!lead.phone && !lead.email)) {
    return NextResponse.json(
      { ok: false, error: "Please add your name and a phone number or email." },
      { status: 400 }
    );
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  }

  const payload = {
    ...lead,
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") || "",
    source: "rentalsbychuk.com",
  };

  const deliveredVia: string[] = [];

  // Channel 1: webhook → Zapier / Make / CRM
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook && (await postJson(webhook, payload))) deliveredVia.push("webhook");

  // Channel 2: email via Cloudflare Email Sending
  const cfAccount = process.env.CLOUDFLARE_ACCOUNT_ID;
  const cfToken = process.env.CLOUDFLARE_EMAIL_TOKEN;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;
  if (notifyEmail && cfAccount && cfToken) {
    const lines = [
      `New lead from rentalsbychuk.com`,
      ``,
      `Name:    ${lead.name}`,
      `Phone:   ${lead.phone || "—"}`,
      `Email:   ${lead.email || "—"}`,
      `Intent:  ${lead.intent}`,
      lead.context ? `Context: ${lead.context}` : "",
      lead.message ? `Message: ${lead.message}` : "",
      lead.page ? `Page:    ${lead.page}` : "",
      `Received: ${payload.receivedAt}`,
    ].filter(Boolean);
    const subject = `🏠 New ${lead.intent} lead: ${lead.name}${lead.context ? ` — ${lead.context}` : ""}`;
    const ok = await postJson(
      `https://api.cloudflare.com/client/v4/accounts/${cfAccount}/email/sending/send`,
      {
        from: { address: "leads@rentalsbychuk.com", name: "RentalsByChuk Leads" },
        to: notifyEmail,
        reply_to: lead.email || undefined,
        subject,
        text: lines.join("\n"),
      },
      { Authorization: `Bearer ${cfToken}` }
    );
    if (ok) deliveredVia.push("email");
  }

  // Always keep a copy in the server log as the fallback of last resort.
  console.log("[lead]", JSON.stringify({ ...payload, deliveredVia }));

  return NextResponse.json({ ok: true, deliveredVia });
}
