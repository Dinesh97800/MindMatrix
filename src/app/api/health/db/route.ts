import { NextResponse } from "next/server";
import { getDatabaseHealth } from "@/lib/db/sequelize";

export async function GET() {
  const health = await getDatabaseHealth();

  return NextResponse.json(health, {
    status: health.connected ? 200 : 503,
  });
}
