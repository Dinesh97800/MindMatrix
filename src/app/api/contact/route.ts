import { NextRequest, NextResponse } from "next/server";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels, type ContactSource } from "@/lib/db/models";
import {
  buildContactAlertHtml,
  sendAdminAlert,
} from "@/lib/email";
import { isValidEmail, jsonError } from "@/lib/api/admin-auth";

const VALID_SOURCES: ContactSource[] = [
  "contact-us",
  "engineering-consultation",
  "request-consultation",
];

export async function POST(request: NextRequest) {
  try {
    await syncDatabase();
    const { ContactSubmission } = getDbModels();
    const body = await request.json();

    const source = body.source as ContactSource;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const message = String(body.message ?? "").trim();
    const phone = body.phone ? String(body.phone).trim() : null;
    const company = body.company ? String(body.company).trim() : null;
    const subject = body.subject ? String(body.subject).trim() : null;
    const metadata =
      body.metadata && typeof body.metadata === "object" ? body.metadata : null;

    if (!VALID_SOURCES.includes(source)) {
      return jsonError("Invalid form source.");
    }
    if (!name || name.length < 2) {
      return jsonError("Please enter your full name.");
    }
    if (!isValidEmail(email)) {
      return jsonError("Please enter a valid email address.");
    }
    if (!message || message.length < 10) {
      return jsonError("Please enter a message (at least 10 characters).");
    }

    const submission = await ContactSubmission.create({
      source,
      name,
      email,
      phone,
      company,
      subject,
      message,
      metadata: metadata ?? undefined,
      status: "new",
    });

    await sendAdminAlert({
      subject: `[Mind Matrix] New ${source} enquiry from ${name}`,
      html: buildContactAlertHtml({
        source,
        name,
        email,
        subject,
        message,
        metadata,
      }),
    }).catch((err) => console.error("[email] contact alert failed:", err));

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/contact]", error);
    return jsonError("Unable to submit your enquiry. Please try again.", 500);
  }
}
