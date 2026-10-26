"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export type LeadIntent =
  | "buyer-match"
  | "home-value"
  | "tour"
  | "relocation"
  | "general";

type Props = {
  intent: LeadIntent;
  /** e.g. property title or community name — stored with the lead */
  context?: string;
  heading?: string;
  blurb?: string;
  ctaLabel?: string;
  /** render on navy/dark backgrounds */
  dark?: boolean;
  /** single-column compact layout for sidebars and result panels */
  compact?: boolean;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Reusable lead-capture form. POSTs to /api/lead, which forwards
 * the lead to a webhook and/or email (see .env.example).
 */
export default function LeadForm({
  intent,
  context,
  heading,
  blurb,
  ctaLabel = "Send →",
  dark = false,
  compact = false,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const inputCls = dark
    ? "w-full rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-[#4F86C6]"
    : "w-full rounded-full border border-[#EEE0C4] bg-white px-4 py-2.5 text-sm text-[#0F2340] placeholder:text-[#8E98A8] outline-none focus:border-[#1F4E8C]";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || (!phone.trim() && !email.trim())) {
      setError("Add your name and a phone number or email so Chuk can reach you.");
      setState("error");
      return;
    }
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          intent,
          context,
          message,
          company,
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setState("done");
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({ event: "generate_lead", lead_intent: intent, lead_context: context || "" });
      }
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong — please text Chuk instead.");
    }
  }

  if (state === "done") {
    return (
      <div
        className={`rounded-2xl p-5 text-center ${
          dark ? "bg-white/10 border border-white/15 text-white" : "bg-[#ECFDF5] border border-[#6EE7B7] text-[#0F2340]"
        }`}
        role="status"
      >
        <div className="text-2xl">✅</div>
        <div className="font-extrabold mt-1">Got it — you&apos;re in.</div>
        <p className={`text-sm mt-1 ${dark ? "text-slate-300" : "text-[#3E4C63]"}`}>
          Chuk replies personally, usually within the hour during business hours.
          Need it faster? <a href={site.smsHref} className="font-bold underline">Text {site.phoneDisplay}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-2.5" noValidate>
      {heading && (
        <div>
          <div className={`font-extrabold ${dark ? "text-white" : "text-[#0F2340]"}`}>{heading}</div>
          {blurb && <p className={`text-sm mt-0.5 ${dark ? "text-slate-300" : "text-[#3E4C63]"}`}>{blurb}</p>}
        </div>
      )}
      <div className={compact ? "grid gap-2.5" : "grid gap-2.5 sm:grid-cols-2"}>
        <input className={inputCls} placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-label="Your name" />
        <input className={inputCls} placeholder="Mobile phone (for a fast text back)" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" aria-label="Mobile phone" />
      </div>
      <input className={inputCls} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-label="Email" />
      <input
        className={inputCls}
        placeholder={
          intent === "home-value"
            ? "Property address + when you're thinking of selling (optional)"
            : intent === "tour"
              ? "Which home, and when works for a showing? (optional)"
              : "Anything Chuk should know? Budget, timing, pre-approval… (optional)"
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Message"
      />
      {/* honeypot — hidden from humans */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
        aria-hidden="true"
      />
      {state === "error" && (
        <p className={`text-sm font-semibold ${dark ? "text-[#FFB59F]" : "text-[#C2410C]"}`} role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="bg-[#C9973B] hover:bg-[#A97B27] disabled:opacity-60 text-white rounded-full py-3 px-6 font-bold text-sm transition-colors"
      >
        {state === "sending" ? "Sending…" : ctaLabel}
      </button>
      <p className={`text-[11px] font-bold text-center ${dark ? "text-slate-200" : "text-[#3E4C63]"}`}>
        {site.brokerage}
      </p>
      <p className={`text-[11px] text-center ${dark ? "text-slate-400" : "text-[#8E98A8]"}`}>
        No spam. Your details are used only for your home search or sale — never sold. Reply STOP to any text to opt out.
      </p>
    </form>
  );
}
