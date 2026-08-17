"use client";

import { useState, type FormEvent } from "react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type Status = "idle" | "submitting" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Get in touch</p>
          <h2>Talk to the branch closest to your freight</h2>
        </Reveal>

        <RevealGroup className="contact-grid">
          <RevealItem className="branch-card">
            <p className="eyebrow">Cape Town · Head Office</p>
            <h3>RB &amp; Son Transport (Cape)</h3>
            <dl>
              <div>
                <b>Address</b>
                <span>5–7 Ipswich Road, Rondevallei, Kuilsriver</span>
              </div>
              <div>
                <b>Phone</b>
                <span>021 557 5112</span>
              </div>
              <div>
                <b>After hours</b>
                <span>Bruce 082 413 0185 · Richard 082 458 2108</span>
              </div>
              <div>
                <b>Email</b>
                <span>richard@rbsoncape.co.za</span>
              </div>
            </dl>
          </RevealItem>

          <RevealItem className="branch-card">
            <p className="eyebrow">Port Elizabeth</p>
            <h3>Perseverance Warehouse</h3>
            <dl>
              <div>
                <b>Address</b>
                <span>17 Kurland Road, Perseverance</span>
              </div>
              <div>
                <b>Phone</b>
                <span>021 557 5112, option 4</span>
              </div>
              <div>
                <b>After hours</b>
                <span>Bruce 082 413 0185 · Richard 082 458 2108</span>
              </div>
              <div>
                <b>Email</b>
                <span>bruce@rbsoncape.co.za</span>
              </div>
            </dl>
          </RevealItem>
        </RevealGroup>

        <Reveal className="quote-form" delay={0.1}>
          <h3>Get Your Quote</h3>
          <p>
            Fill out the form below and the right branch will respond
            directly with pricing.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name">Full Name *</label>
                <input id="name" name="name" type="text" required placeholder="John Doe" />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Phone Number *</label>
                <input id="phone" name="phone" type="tel" required placeholder="082 000 0000" />
              </div>
              <div className="form-field span-2">
                <label htmlFor="email">Email Address *</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" />
              </div>
              <div className="form-field">
                <label htmlFor="pickup">Pickup Address *</label>
                <input id="pickup" name="pickup" type="text" required placeholder="e.g. Cape Town" />
              </div>
              <div className="form-field">
                <label htmlFor="dropoff">Drop-off Address *</label>
                <input id="dropoff" name="dropoff" type="text" required placeholder="e.g. Durban" />
              </div>
              <div className="form-field">
                <label htmlFor="serviceType">Service Type *</label>
                <select id="serviceType" name="serviceType" required defaultValue="">
                  <option value="" disabled>Select service</option>
                  <option value="long-haul">Long &amp; Short Haul</option>
                  <option value="warehousing">Warehousing</option>
                  <option value="dangerous-goods">Dangerous Goods</option>
                  <option value="fleet">Fleet / Local Delivery</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="loadType">Load Type</label>
                <select id="loadType" name="loadType" defaultValue="">
                  <option value="" disabled>Select load</option>
                  <option value="break-bulk">Break-bulk</option>
                  <option value="palletised">Palletised</option>
                  <option value="drums">Drums / Chemicals</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="urgency">Urgency *</label>
                <select id="urgency" name="urgency" required defaultValue="">
                  <option value="" disabled>Select urgency</option>
                  <option value="standard">Standard</option>
                  <option value="urgent">Urgent (this week)</option>
                  <option value="emergency">Emergency (same-day)</option>
                </select>
              </div>
              <div className="form-field span-2">
                <label htmlFor="message">Additional Details</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Weight, dimensions, tonnage, special handling requirements..."
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-gold" type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Get Your Quote"}
              </button>
              {status === "ok" && (
                <span className="form-status ok">
                  Thanks — we&apos;ll respond within 30 minutes during business hours.
                </span>
              )}
              {status === "error" && (
                <span className="form-status err">{errorMsg}</span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
