type InquiryPayload = {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  projectType?: unknown;
  timeline?: unknown;
  details?: unknown;
  selectedPackage?: unknown;
  companyWebsite?: unknown;
  startedAt?: unknown;
};

type EmailEnvironment = {
  EMAIL?: EmailSendBinding;
  PROJECT_INBOX?: string;
};

type EmailSendMessage = {
  to: string | string[];
  from: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
};

type EmailSendBinding = {
  send(message: EmailSendMessage): Promise<{ messageId: string }>;
};

declare global {
  var __NOVA_EMAIL_ENV__: EmailEnvironment | undefined;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\//i;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function json(message: string, status: number) {
  return Response.json({ message }, { status });
}

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return json("Please check the form and try again.", 400);
  }

  const name = clean(payload.name, 80);
  const business = clean(payload.business, 100);
  const email = clean(payload.email, 160).toLowerCase();
  const phone = clean(payload.phone, 40);
  const website = clean(payload.website, 240);
  const projectType = clean(payload.projectType, 60);
  const timeline = clean(payload.timeline, 60);
  const details = clean(payload.details, 3000);
  const selectedPackage = clean(payload.selectedPackage, 40) || "Not selected";
  const honeypot = clean(payload.companyWebsite, 200);
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;

  if (honeypot) {
    return json("Thanks. Your project details are on their way.", 200);
  }

  if (startedAt <= 0 || Date.now() - startedAt < 2000) {
    return json("Please take a moment to review your details, then try again.", 400);
  }

  if (!name || !business || !EMAIL_PATTERN.test(email)) {
    return json("Please complete all required fields with valid information.", 400);
  }

  if (website && !URL_PATTERN.test(website)) {
    return json("Please enter the website address beginning with http:// or https://.", 400);
  }

  const runtimeEnv = globalThis.__NOVA_EMAIL_ENV__ ?? process.env;
  const emailBinding = runtimeEnv.EMAIL;
  const inbox = runtimeEnv.PROJECT_INBOX?.trim() || "novawebservices2026@outlook.com";
  const from = "NOVA Web Services <inquiries@novawebservices.net>";

  if (!emailBinding) {
    return json("Email delivery is being configured. Please try again soon.", 503);
  }

  const rows = [
    ["Name", name],
    ["Business", business],
    ["Email", email],
    ["Package preference", selectedPackage],
    ["Phone", phone || "Not provided"],
    ["Current website", website || "Not provided"],
    ["Project type", projectType || "Continues in Tally questionnaire"],
    ["Ideal timeline", timeline || "No firm timeline"],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th style="padding:10px 16px 10px 0;text-align:left;vertical-align:top;color:#6f6974;font-weight:600">${escapeHtml(label)}</th><td style="padding:10px 0;color:#111014">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const text = [
    "New NOVA Web Services project inquiry",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    ...(details ? ["Project details:", details] : ["Next step: Full Tally questionnaire"]),
  ].join("\n");

  const safeBusinessForSubject = business.replace(/[\r\n]+/g, " ");

  try {
    await emailBinding.send({
      from,
      to: inbox,
      replyTo: email,
      subject: `New NOVA project inquiry: ${safeBusinessForSubject}`,
      text,
      html: `
          <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#111014">
            <p style="margin:0 0 8px;color:#7638dd;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">NOVA Web Services</p>
            <h1 style="margin:0 0 24px;font-size:28px;line-height:1.15">New project inquiry</h1>
            <table style="width:100%;border-collapse:collapse;border-top:1px solid #ddd6e2;border-bottom:1px solid #ddd6e2">${htmlRows}</table>
            ${details ? `<h2 style="margin:28px 0 10px;font-size:18px">Project details</h2><p style="margin:0;white-space:pre-wrap;line-height:1.65;color:#3e3942">${escapeHtml(details)}</p>` : `<p style="margin:28px 0 0;color:#6f6974">The client is continuing to the full Tally questionnaire.</p>`}
            <p style="margin:30px 0 0;color:#6f6974;font-size:12px">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
          </div>
        `,
    });
  } catch (error) {
    console.error("Project inquiry email request failed", error);
    return json("Your inquiry could not be sent right now. Please try again in a moment.", 502);
  }

  return json("Thanks. Your project details are on their way.", 200);
}
