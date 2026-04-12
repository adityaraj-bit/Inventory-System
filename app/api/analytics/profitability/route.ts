import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { getProfitabilityTrend } from "@/services/analyticsService";

export async function GET() {
  await requireAuth();

  const data = await getProfitabilityTrend();

  return NextResponse.json({
    success: true,
    data
  });
}
