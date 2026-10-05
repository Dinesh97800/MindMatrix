import { NextRequest, NextResponse } from "next/server";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels } from "@/lib/db/models";
import { jsonError, requireAdmin } from "@/lib/api/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  await syncDatabase();
  const { ContactSubmission } = getDbModels();
  const { id } = await context.params;
  const submission = await ContactSubmission.findByPk(Number(id));

  if (!submission) {
    return jsonError("Submission not found.", 404);
  }

  return NextResponse.json({ submission });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  await syncDatabase();
  const { ContactSubmission } = getDbModels();
  const { id } = await context.params;
  const submission = await ContactSubmission.findByPk(Number(id));

  if (!submission) {
    return jsonError("Submission not found.", 404);
  }

  const body = await request.json();
  if (body.status && ["new", "read", "archived"].includes(body.status)) {
    submission.status = body.status;
    await submission.save();
  }

  return NextResponse.json({ submission });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  await syncDatabase();
  const { ContactSubmission } = getDbModels();
  const { id } = await context.params;
  const submission = await ContactSubmission.findByPk(Number(id));

  if (!submission) {
    return jsonError("Submission not found.", 404);
  }

  await submission.destroy();
  return NextResponse.json({ success: true });
}
