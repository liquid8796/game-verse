"use client";

import { useState, type FormEvent } from "react";
import { budgetOptions, inquiryKinds } from "@/features/business-inquiries/validation";

type FormStatus = { kind: "success" | "error"; text: string } | null;
const initial = { name: "", email: "", company: "", website: "", kind: "display", budget: "not-set", message: "", companyFax: "", consent: false };

export function BusinessInquiryForm() {
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);
  const set = (key: keyof typeof initial, value: string | boolean) =>
    setValues((previous) => ({ ...previous, [key]: value }));
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch("/api/business-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json() as { error?: string; reference?: string };
      if (!response.ok) {
        setStatus({ kind: "error", text: data.error || "Unable to send the enquiry right now." });
      } else {
        setStatus({ kind: "success", text: "Thanks — your enquiry is in our business inbox. Reference: " + data.reference });
        setValues(initial);
      }
    } catch {
      setStatus({ kind: "error", text: "Connection lost. Please check your network and try again." });
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="partner-form" onSubmit={submit} noValidate={false}>
      <div className="partner-form-top">
        <span>BUSINESS ENQUIRY / GAMEVERSE</span>
        <span>REQUIRED FIELDS *</span>
      </div>
      <div className="partner-form-grid">
        <label>Full name *<input name="name" autoComplete="name" required minLength={2} maxLength={100} value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" /></label>
        <label>Work email *<input name="email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" /></label>
        <label>Company / brand *<input name="company" autoComplete="organization" required minLength={2} maxLength={120} value={values.company} onChange={(e) => set("company", e.target.value)} placeholder="Organisation name" /></label>
        <label>Company website<input name="website" type="url" maxLength={240} value={values.website} onChange={(e) => set("website", e.target.value)} placeholder="https://example.com" /></label>
        <label>Collaboration type *<select name="kind" required value={values.kind} onChange={(e) => set("kind", e.target.value)}>{inquiryKinds.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
        <label>Estimated campaign budget *<select name="budget" required value={values.budget} onChange={(e) => set("budget", e.target.value)}>{budgetOptions.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
        <label className="partner-form-full">Your proposal *<textarea name="message" required minLength={30} maxLength={4000} rows={6} value={values.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about your brand, target games or audiences, partnership goals, timeline and preferred format." /></label>
      </div>
      <div className="partner-honeypot" aria-hidden="true"><label htmlFor="companyFax">Fax number</label><input id="companyFax" name="companyFax" type="text" tabIndex={-1} autoComplete="off" value={values.companyFax} onChange={(e) => set("companyFax", e.target.value)} /></div>
      <label className="partner-consent"><input type="checkbox" required checked={values.consent} onChange={(e) => set("consent", e.target.checked)} /> <span>I agree that GameVerse may store these details and contact me about this business enquiry. *</span></label>
      <div className="partner-submit-row">
        <button type="submit" className="button-primary" disabled={busy}>{busy ? "SENDING ENQUIRY..." : "SEND BUSINESS ENQUIRY"} <span aria-hidden="true">↗</span></button>
        <p>For business proposals only. No account required.</p>
      </div>
      {status && <p className={"partner-form-status partner-form-status-" + status.kind} role="status" aria-live="polite">{status.text}</p>}
    </form>
  );
}
