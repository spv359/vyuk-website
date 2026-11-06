"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SquarePen } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function DiscoveryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Your request could not be sent.");
      form.reset();
      setStatus("success");
      setMessage("Thank you. We’ll review your use case and reply personally.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your request could not be sent. Please email us instead.");
    }
  }

  return (
    <form className="contact-form" aria-label="Start a conversation" onSubmit={handleSubmit}>
      <span className="contact-icon contact-form-icon" aria-hidden="true"><SquarePen size={23} strokeWidth={1.8} /></span>
      <div className="form-two-col">
        <label><span>Your name</span><span className="field-control"><Input name="fullName" type="text" autoComplete="name" maxLength={100} required /></span></label>
        <label><span>Work email</span><span className="field-control"><Input name="workEmail" type="email" autoComplete="email" maxLength={180} required /></span></label>
      </div>
      <label><span>Company</span><span className="field-control"><Input name="company" type="text" autoComplete="organization" maxLength={160} required /></span></label>
      <label><span>What use case are you considering?</span><span className="field-control"><Textarea name="workflow" rows={5} maxLength={1600} placeholder="A few lines are enough to get started." required /></span></label>
      <label className="honeypot" aria-hidden="true">Website<Input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      <p className="form-privacy">We use your details to respond to your enquiry. Read our <a href="/privacy">Privacy Policy</a>.</p>
      <Button className="form-submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Start a conversation"}
      </Button>
      <p className={`form-message ${status}`} role="status" aria-live="polite">{message}</p>
    </form>
  );
}
