import { NextRequest, NextResponse } from "next/server";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels } from "@/lib/db/models";
import { requireAdmin } from "@/lib/api/admin-auth";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  await syncDatabase();
  const { ContactSubmission } = getDbModels();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const source = searchParams.get("source");

  const where: Record<string, string> = {};
  if (status) where.status = status;
  if (source) where.source = source;

  const submissions = await ContactSubmission.findAll({
    where,
    order: [["createdAt", "DESC"]],
    limit: 200,
  });

  return NextResponse.json({ submissions });
}
