import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels } from "@/lib/db/models";
import { jsonError, requireSuperAdmin } from "@/lib/api/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  await syncDatabase();
  const { AdminUser } = getDbModels();
  const { id } = await context.params;
  const user = await AdminUser.findByPk(Number(id));

  if (!user) {
    return jsonError("User not found.", 404);
  }

  const body = await request.json();

  if (typeof body.isActive === "boolean") {
    user.isActive = body.isActive;
  }
  if (body.role === "admin" || body.role === "super_admin") {
    user.role = body.role;
  }
  if (body.name) {
    user.name = String(body.name).trim();
  }
  if (body.password && String(body.password).length >= 8) {
    user.passwordHash = await bcrypt.hash(String(body.password), 12);
  }

  await user.save();

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    },
  });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { session, error } = await requireSuperAdmin();
  if (error) return error;

  await syncDatabase();
  const { AdminUser } = getDbModels();
  const { id } = await context.params;

  if (String(session!.user.id) === id) {
    return jsonError("You cannot delete your own account.", 400);
  }

  const user = await AdminUser.findByPk(Number(id));
  if (!user) {
    return jsonError("User not found.", 404);
  }

  await user.destroy();
  return NextResponse.json({ success: true });
}
