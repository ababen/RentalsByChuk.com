"use client";

import { useState } from "react";

// Estimated monthly payment: principal & interest (standard amortization)
// plus the Florida extras buyers forget — taxes, insurance and HOA.
// Every input is the visitor's own; nothing here is a market figure.

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

function Field({ label, value, onChange, step = 1, suffix }: { label: string; value: number; onChange: (v: number) => void; step?: number; suffix?: string }) {
  return (
    <label className="grid gap-1 text-sm font-bold">
      <span>{label}{suffix && <span className="font-semibold text-[#6B7486]"> ({suffix})</span>}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full rounded-full border border-[#EEE0C4] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#1F4E8C]"
      />
    </label>
  );
}

export default function MortgageCalculator() {
  const [price, setPrice] = useState(650000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [taxPct, setTaxPct] = useState(1.8);
  const [insurance, setInsurance] = useState(6000);
  const [hoa, setHoa] = useState(250);

  const loan = Math.max(price * (1 - downPct / 100), 0);
  const r = rate / 100 / 12;
  const n = Math.max(years * 12, 1);
  const pi = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
  const tax = (price * taxPct) / 100 / 12;
  const ins = insurance / 12;
  const total = pi + tax + ins + hoa;

  const rows = [
    { k: "Principal & interest", v: pi },
    { k: "Property tax", v: tax },
    { k: "Homeowners / wind / flood insurance", v: ins },
    { k: "HOA dues", v: hoa },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="s-col grid gap-3">
        <Field label="Home price" value={price} onChange={setPrice} step={5000} suffix="$" />
        <Field label="Down payment" value={downPct} onChange={setDownPct} step={0.5} suffix="%" />
        <Field label="Interest rate" value={rate} onChange={setRate} step={0.125} suffix="% APR" />
        <Field label="Loan term" value={years} onChange={setYears} suffix="years" />
        <Field label="Property tax rate" value={taxPct} onChange={setTaxPct} step={0.05} suffix="% of price / yr" />
        <Field label="Insurance" value={insurance} onChange={setInsurance} step={250} suffix="$ / yr" />
        <Field label="HOA dues" value={hoa} onChange={setHoa} step={25} suffix="$ / mo" />
      </div>
      <div className="s-col" aria-live="polite">
        <div className="s-kicker">Estimated monthly payment</div>
        <div className="text-5xl font-black mt-1" style={{ fontFamily: "var(--font-archivo)" }}>{money(total)}</div>
        <ul className="mt-4">
          {rows.map((x) => (
            <li key={x.k}><b>{money(x.v)}</b><span>{x.k}</span></li>
          ))}
        </ul>
        <p className="s-fine">
          Loan amount {money(loan)}. Estimate only — not a loan offer. Your actual rate, taxes (Florida
          reassesses at sale), insurance and HOA will differ; a lender pre-approval gives you the real number.
          Defaults are placeholders, not current market rates.
        </p>
      </div>
    </div>
  );
}
