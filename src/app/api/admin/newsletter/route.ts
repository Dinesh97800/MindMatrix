import { NextResponse } from "next/server";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels } from "@/lib/db/models";
import { requireAdmin } from "@/lib/api/admin-auth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  await syncDatabase();
  const { NewsletterSubscription } = getDbModels();

  const subscriptions = await NewsletterSubscription.findAll({
    order: [["createdAt", "DESC"]],
    limit: 500,
  });

  return NextResponse.json({ subscriptions });
}
