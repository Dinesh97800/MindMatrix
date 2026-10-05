import nodemailer from "nodemailer";

type SendMailInput = {
  subject: string;
  html: string;
  text?: string;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendAdminAlert({ subject, html, text }: SendMailInput) {
  const to = process.env.ADMIN_ALERT_EMAIL;
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;

  if (!to || !from) {
    console.warn("[email] ADMIN_ALERT_EMAIL or SMTP_FROM not configured.");
    return;
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] SMTP not configured; skipping alert.");
    return;
  }

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text: text ?? html.replace(/<[^>]+>/g, " "),
  });
}

export function buildContactAlertHtml(payload: {
  source: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  metadata?: Record<string, unknown> | null;
}) {
  const meta =
    payload.metadata && Object.keys(payload.metadata).length > 0
      ? `<pre style="background:#f4f7f9;padding:12px;border-radius:8px;overflow:auto">${JSON.stringify(payload.metadata, null, 2)}</pre>`
      : "";

  return `
    <h2>New ${payload.source} submission</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    ${payload.subject ? `<p><strong>Subject:</strong> ${payload.subject}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br />")}</p>
    ${meta}
  `;
}

export function buildNewsletterAlertHtml(email: string) {
  return `
    <h2>New newsletter subscription</h2>
    <p><strong>Email:</strong> ${email}</p>
  `;
}
