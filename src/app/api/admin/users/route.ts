import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { syncDatabase } from "@/lib/db/sequelize";
import { getDbModels } from "@/lib/db/models";
import { isValidEmail, jsonError, requireSuperAdmin } from "@/lib/api/admin-auth";

export async function GET() {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  await syncDatabase();
  const { AdminUser } = getDbModels();

  const users = await AdminUser.findAll({
    attributes: ["id", "name", "email", "role", "isActive", "createdAt"],
    order: [["createdAt", "DESC"]],
  });

  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  await syncDatabase();
  const { AdminUser } = getDbModels();
  const body = await request.json();

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const role = body.role === "super_admin" ? "super_admin" : "admin";

  if (!name || name.length < 2) {
    return jsonError("Name is required.");
  }
  if (!isValidEmail(email)) {
    return jsonError("Valid email is required.");
  }
  if (password.length < 8) {
    return jsonError("Password must be at least 8 characters.");
  }

  const existing = await AdminUser.findOne({ where: { email } });
  if (existing) {
    return jsonError("An admin with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await AdminUser.create({
    name,
    email,
    passwordHash,
    role,
    isActive: true,
  });

  return NextResponse.json(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    },
    { status: 201 }
  );
}
