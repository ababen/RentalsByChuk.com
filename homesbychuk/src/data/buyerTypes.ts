// Homepage "what kind of mover are you?" picker. Guidance is Chuk's
// working advice — no market statistics live here on purpose, so nothing
// goes stale. Add sourced numbers only with a source and date.

export type MoverType = {
  key: string;
  emoji: string;
  cardTitle: string;
  blurb: string;
  fits: string;
  plan: string;
  first: string;
  gotcha: string;
  sms: string;
};

export const moverTypes: MoverType[] = [
  {
    key: "first-time",
    emoji: "🔑",
    cardTitle: "First-time buyer",
    blurb: "Renting's been fine, but you're done paying someone else's mortgage. Let's make the first one a good one.",
    fits: "Northwood · Flamingo Park · Abacoa townhomes",
    plan: "Pre-approval → short list → tour → offer → inspection → close",
    first: "Get pre-approved before you tour. I'll connect you with a lender if you don't have one.",
    gotcha: "Budget for more than the mortgage: HOA dues, flood and windstorm insurance, and taxes can move the monthly number a lot here. I price it out before you fall for a house.",
    sms: "Hi Chuk — I'm a first-time buyer looking in WPB / PBG / Jupiter.",
  },
  {
    key: "relocating",
    emoji: "🧳",
    cardTitle: "Relocating here",
    blurb: "New job, new state, and a house to buy from 1,000 miles away. That's half my practice.",
    fits: "Palm Beach Gardens · Abacoa · The Bluffs",
    plan: "Video tours → remote offer → inspection on FaceTime → e-sign close",
    first: "Tell me your start date and school needs. I'll work backwards from it.",
    gotcha: "Not ready to buy blind? Rent first with RentalsByChuk, learn the neighborhoods, then buy — I'll run both.",
    sms: "Hi Chuk — I'm relocating to Palm Beach County and want to buy a home.",
  },
  {
    key: "move-up",
    emoji: "🏡",
    cardTitle: "Moving up or down",
    blurb: "Need more room, or less. Either way you're buying and selling at the same time — the timing is the whole game.",
    fits: "PGA National · BallenIsles · Egret Landing",
    plan: "Price your current home → line up the next one → coordinate both closings",
    first: "Get a pricing opinion on what you own first. It sets your real budget.",
    gotcha: "Buy-then-sell and sell-then-buy each carry a different risk. I'll lay out both, including contingencies and rent-back options, before you commit.",
    sms: "Hi Chuk — I want to sell my home and buy another in WPB / PBG / Jupiter.",
  },
  {
    key: "seller",
    emoji: "🪧",
    cardTitle: "Selling",
    blurb: "You want top dollar without six months of open houses. Pricing, prep and presentation are where that's won.",
    fits: "Anywhere in West Palm Beach, Palm Beach Gardens & Jupiter",
    plan: "Pricing opinion → prep & photos → launch → offers → close",
    first: "Ask me for a free pricing opinion. No pressure, no listing agreement needed to get one.",
    gotcha: "Overpricing is the costliest mistake: the first two weeks get the most attention, and a stale listing invites low offers.",
    sms: "Hi Chuk — I'm thinking about selling my home. Can you give me a pricing opinion?",
  },
  {
    key: "investor",
    emoji: "📈",
    cardTitle: "Investor",
    blurb: "Buying to rent it out. I know the rental side cold — that's what RentalsByChuk does all day.",
    fits: "Northwood · Downtown condos · Jupiter single-family",
    plan: "Rent comps → HOA rental rules → numbers → offer → lease-up",
    first: "Check the HOA's rental rules before you write an offer. Some communities cap or ban leasing.",
    gotcha: "Many associations require minimum lease terms, approval, or an ownership period before renting. I pull the documents before you're under contract.",
    sms: "Hi Chuk — I'm an investor looking to buy a rental property in Palm Beach County.",
  },
];
