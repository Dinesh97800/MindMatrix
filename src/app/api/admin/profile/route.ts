import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels } from "@/lib/db/models";
import { isValidEmail, jsonError, requireAdmin } from "@/lib/api/admin-auth";

export async function GET() {
  const { session, error } = await requireAdmin();
  if (error) return error;

  await syncDatabase();
  const { AdminUser } = getDbModels();

  const user = await AdminUser.findByPk(Number(session!.user.id), {
    attributes: ["id", "name", "email", "role", "createdAt"],
  });

  if (!user) {
    return jsonError("User not found.", 404);
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
}

export async function PATCH(request: NextRequest) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  await syncDatabase();
  const { AdminUser } = getDbModels();

  const user = await AdminUser.findByPk(Number(session!.user.id));
  if (!user) {
    return jsonError("User not found.", 404);
  }

  const body = await request.json();
  const name = body.name !== undefined ? String(body.name).trim() : undefined;
  const email =
    body.email !== undefined ? String(body.email).trim().toLowerCase() : undefined;
  const currentPassword =
    body.currentPassword !== undefined ? String(body.currentPassword) : undefined;
  const newPassword =
    body.newPassword !== undefined ? String(body.newPassword) : undefined;

  if (name !== undefined) {
    if (!name || name.length < 2) {
      return jsonError("Name must be at least 2 characters.");
    }
    user.name = name;
  }

  if (email !== undefined) {
    if (!isValidEmail(email)) {
      return jsonError("Please enter a valid email address.");
    }
    if (email !== user.email) {
      const existing = await AdminUser.findOne({ where: { email } });
      if (existing) {
        return jsonError("An admin with this email already exists.");
      }
      user.email = email;
    }
  }

  if (newPassword !== undefined) {
    if (!currentPassword) {
      return jsonError("Current password is required to set a new password.");
    }
    if (newPassword.length < 8) {
      return jsonError("New password must be at least 8 characters.");
    }

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return jsonError("Current password is incorrect.");
    }

    user.passwordHash = await bcrypt.hash(newPassword, 12);
  }

  await user.save();

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
}
