import { NextRequest, NextResponse } from "next/server";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels } from "@/lib/db/models";
import { buildNewsletterAlertHtml, sendAdminAlert } from "@/lib/email";
import { isValidEmail, jsonError } from "@/lib/api/admin-auth";

export async function POST(request: NextRequest) {
  try {
    await syncDatabase();
    const { NewsletterSubscription } = getDbModels();
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const source = body.source ? String(body.source).trim() : "home-footer";

    if (!isValidEmail(email)) {
      return jsonError("Please enter a valid email address.");
    }

    const [subscription, created] = await NewsletterSubscription.findOrCreate({
      where: { email },
      defaults: { email, source, status: "active" },
    });

    if (!created && subscription.status === "unsubscribed") {
      subscription.status = "active";
      subscription.source = source;
      await subscription.save();
    }

    if (created) {
      await sendAdminAlert({
        subject: `[Mind Matrix] New newsletter subscription`,
        html: buildNewsletterAlertHtml(email),
      }).catch((err) => console.error("[email] newsletter alert failed:", err));
    }

    return NextResponse.json({ success: true, created }, { status: 201 });
  } catch (error) {
    console.error("[api/newsletter]", error);
    return jsonError("Unable to subscribe. Please try again.", 500);
  }
}
