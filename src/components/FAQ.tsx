"use client";

import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type QA = { question: string; answer: string };

const FAQS: QA[] = [
  {
    question: "How quickly can I get a quote?",
    answer:
      "Submit the quote form with your pickup, drop-off and load details and the branch closest to your freight responds directly — most quotes go out the same business day.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "Scheduled weekly runs between Cape Town, Port Elizabeth, Johannesburg and Durban, plus regular service into the Northern Cape (Eden Karoo, Keimoes, Grootdrink) and Western Cape farming districts.",
  },
  {
    question: "Can you handle dangerous goods?",
    answer:
      "Yes — RB & Son is SQAS approved and handles full compliance paperwork, placarding and handling protocols for dangerous and hazardous cargo, nationwide.",
  },
  {
    question: "What size loads can your fleet take?",
    answer:
      "From 1-ton local drops to 34-ton long-haul combinations, using a mix of owned vehicles and vetted subcontractors for peak demand.",
  },
  {
    question: "Do you offer warehousing as well as transport?",
    answer:
      "Yes — warehousing, dispatch and the full fleet operate out of the Saxdowne facility, so freight can be stored and consolidated between legs of a route.",
  },
  {
    question: "Is my cargo insured in transit?",
    answer:
      "RB & Son arranges Goods-in-Transit insurance, but cover details vary — ask your branch what's in place for your shipment. If you want your goods insured to their full value, we'd recommend also carrying your own all-risk insurance.",
  },
  {
    question: "How do I pay, and what are the terms?",
    answer:
      "Standard terms are 30 days from invoice date unless otherwise agreed in writing — full details are in our Terms & Conditions (PDF link in the footer).",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2>Questions we get asked</h2>
        </Reveal>
        <RevealGroup className="faq-list">
          {FAQS.map((qa, i) => {
            const open = openIndex.has(i);
            return (
              <RevealItem className="faq-item" key={qa.question}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={open}
                  onClick={() => toggle(i)}
                >
                  <span>{qa.question}</span>
                  <svg
                    className={open ? "faq-chevron open" : "faq-chevron"}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {open && <p className="faq-answer">{qa.answer}</p>}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
