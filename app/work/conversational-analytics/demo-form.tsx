"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { siteDetails } from "../../site-details";
import styles from "./page.module.css";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function DemoForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const question = String(data.get("question") || "").trim();
    setStatus("submitting");
    setMessage("");

    try {
      // Keep the existing enquiry endpoint and identify this request in its workflow field.
      // A question is optional for a demo; the product request supplies the required context.
      const response = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          workEmail: data.get("workEmail"),
          company: data.get("company"),
          workflow: `Conversational analytics — vyu demo request.${question ? `\nQuestion: ${question}` : ""}`,
          website: data.get("website"),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Your request could not be sent.");
      form.reset();
      setStatus("success");
      setMessage("Thank you. Your demo request has been received.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your request could not be sent. Please email us instead.");
    }
  }

  return (
    <form className={styles.form} aria-label="Request a vyu demonstration" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      <div className={styles.formPair}>
        <label><span>Name</span><input name="fullName" type="text" autoComplete="name" maxLength={100} required /></label>
        <label><span>Work email</span><input name="workEmail" type="email" autoComplete="email" maxLength={180} required /></label>
      </div>
      <label><span>Company</span><input name="company" type="text" autoComplete="organization" maxLength={160} required /></label>
      <label><span>A question you would like to explore <span className={styles.optional}>· optional</span></span><textarea name="question" rows={4} maxLength={1450} placeholder="What would you like to understand about your business?" /></label>
      <label className={styles.honeypot} aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      <p className={styles.privacy}>We use your details to respond to your enquiry. Read our <a href="/privacy">Privacy Policy</a>.</p>
      <button className={styles.primary} type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Request a demo"}</button>
      <div className={styles.formStatus} role="status" aria-live="polite" aria-atomic="true">
        {message && (
          <p className={status === "error" ? styles.error : styles.success}>
            {status === "success" && <CircleCheck size={18} strokeWidth={1.8} aria-hidden="true" />}
            {status === "error" && <CircleAlert size={18} strokeWidth={1.8} aria-hidden="true" />}
            <span>{message}</span>
          </p>
        )}
        {status === "error" && <a href={`mailto:${siteDetails.email}?subject=vyu%20demo%20request`}>Email us to request a demo</a>}
      </div>
    </form>
  );
}
