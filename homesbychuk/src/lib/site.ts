// ─────────────────────────────────────────────────────────────
// Central site config — ONE place to update contact details.
// Every call / text / WhatsApp link and every lead form on the
// site reads from here.
//
// Same business line as RentalsByChuk: (561) 220-9399.
// ─────────────────────────────────────────────────────────────

const PHONE_DISPLAY = "(561) 220-9399";
const PHONE_E164 = "+15612209399"; // digits only, country code first
const SMS_BODY = "Hi Chuk — I'm thinking about buying or selling a home in WPB / PBG / Jupiter.";

export const site = {
  name: "HomesByChuk",
  tagline: "Buy & sell — WPB • Palm Beach Gardens • Jupiter",
  brokerage: "LoKation Real Estate",
  url: "https://homesbychuk.com",
  email: "chuk@homesbychuk.com",
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:${PHONE_E164}`,
  smsHref: `sms:${PHONE_E164}?&body=${encodeURIComponent(SMS_BODY)}`,
  whatsappHref: `https://wa.me/${PHONE_E164.replace("+", "")}?text=${encodeURIComponent(SMS_BODY)}`,
  areasServed: ["West Palm Beach", "Palm Beach Gardens", "Jupiter"],
  // Sister brand for renters — linked from header, footer and FAQ.
  rentalsUrl: "https://rentalsbychuk.com",
  // Date the site's content last changed (YYYY-MM-DD). Used as
  // lastModified in the sitemap — bump it when pages or data are updated.
  contentUpdated: "2026-10-26",
  // Official profiles of this business (Google Business Profile, Zillow,
  // Realtor.com, LinkedIn, LoKation agent page…). Added to the
  // RealEstateAgent JSON-LD as `sameAs`. Full https URLs only.
  sameAs: [
    "https://lokationagent.com/agent/alexander-babenchuk",
    "https://rentalsbychuk.com",
  ] as string[],
};

/** sms: link with a custom pre-filled body. */
export const smsFor = (body: string) =>
  `${site.smsHref.split("?")[0]}?&body=${encodeURIComponent(body)}`;
