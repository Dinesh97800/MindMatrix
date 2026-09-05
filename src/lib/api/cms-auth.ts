import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api/admin-auth";

export async function requireCmsAccess() {
  return requireAdmin();
}

export function cmsError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function cmsOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}
