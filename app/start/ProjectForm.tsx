"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ProjectForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Your inquiry could not be sent.");
      }

      form.reset();
      setFormState("success");
      setMessage(result.message || "Thanks. Your project details are on their way.");
    } catch (error) {
      setFormState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again in a moment.",
      );
    }
  }

  if (formState === "success") {
    return (
      <section className="project-form-card project-form-success" aria-live="polite">
        <span className="project-success-mark" aria-hidden="true">✓</span>
        <span className="project-form-kicker">Inquiry received</span>
        <h2>Thanks for reaching out.</h2>
        <p>{message}</p>
        <p>I&apos;ll review everything and reply personally by email.</p>
        <button
          className="project-reset-button"
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setFormState("idle");
            setMessage("");
          }}
        >
          Send another inquiry
        </button>
      </section>
    );
  }

  return (
    <form className="project-form-card" onSubmit={handleSubmit}>
      <div className="project-form-heading">
        <span className="project-form-kicker">Project inquiry</span>
        <h2>Let&apos;s build something clear and memorable.</h2>
        <p>Fields marked with an asterisk are required.</p>
      </div>

      <div className="project-field-row">
        <label>
          <span>Your name *</span>
          <input name="name" type="text" autoComplete="name" required maxLength={80} />
        </label>
        <label>
          <span>Business name *</span>
          <input name="business" type="text" autoComplete="organization" required maxLength={100} />
        </label>
      </div>

      <div className="project-field-row">
        <label>
          <span>Email address *</span>
          <input name="email" type="email" autoComplete="email" required maxLength={160} />
        </label>
        <label>
          <span>Phone <small>optional</small></span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
      </div>

      <label>
        <span>Current website <small>optional</small></span>
        <input
          name="website"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          maxLength={240}
        />
      </label>

      <div className="project-field-row">
        <label>
          <span>What do you need? *</span>
          <select name="projectType" required defaultValue="">
            <option value="" disabled>Select one</option>
            <option value="New website">A new website</option>
            <option value="Website redesign">A website redesign</option>
            <option value="Not sure yet">I&apos;m not sure yet</option>
          </select>
        </label>
        <label>
          <span>Ideal timeline <small>optional</small></span>
          <select name="timeline" defaultValue="">
            <option value="">No firm timeline</option>
            <option value="As soon as possible">As soon as possible</option>
            <option value="Within 2–4 weeks">Within 2–4 weeks</option>
            <option value="Within 1–2 months">Within 1–2 months</option>
            <option value="Just exploring">Just exploring</option>
          </select>
        </label>
      </div>

      <label>
        <span>Tell me about the project *</span>
        <textarea
          name="details"
          required
          minLength={20}
          maxLength={3000}
          placeholder="What does your business do, who is the website for, and what should visitors be able to do?"
        />
      </label>

      <label className="project-honeypot" aria-hidden="true">
        <span>Leave this field empty</span>
        <input name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="project-form-footer">
        <p>
          Your information is only used to respond to this inquiry. See our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <button className="project-submit-button" type="submit" disabled={formState === "submitting"}>
          {formState === "submitting" ? "Sending…" : "Send Project Details"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <p
        className={`project-form-status${formState === "error" ? " is-error" : ""}`}
        role={formState === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
