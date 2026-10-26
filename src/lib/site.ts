// ─────────────────────────────────────────────────────────────
// Central site config — ONE place to update contact details.
// Every call / text / WhatsApp link and every lead form on the
// site reads from here.
//
// Business number confirmed by Alex 2026-10-24: (561) 220-9399.
// ─────────────────────────────────────────────────────────────

const PHONE_DISPLAY = "(561) 220-9399";
const PHONE_E164 = "+15612209399"; // digits only, country code first

export const site = {
  name: "RentalsByChuk",
  tagline: "Rentals only — WPB • Palm Beach Gardens • Jupiter",
  brokerage: "LoKation Real Estate",
  url: "https://rentalsbychuk.com",
  email: "chuk@rentalsbychuk.com",
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:${PHONE_E164}`,
  smsHref: `sms:${PHONE_E164}?&body=${encodeURIComponent(
    "Hi Chuk — I'm interested in a rental in WPB / PBG / Jupiter."
  )}`,
  whatsappHref: `https://wa.me/${PHONE_E164.replace("+", "")}?text=${encodeURIComponent(
    "Hi Chuk — I'm interested in a rental in WPB / PBG / Jupiter."
  )}`,
  areasServed: ["West Palm Beach", "Palm Beach Gardens", "Jupiter"],
};
