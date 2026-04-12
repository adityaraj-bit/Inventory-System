import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import {
  getSupplierAnalytics,
  getStockMovementTrend
} from "@/services/analyticsService";

export async function GET() {
  await requireAuth();

  const [supplierStats, stockTrend] = await Promise.all([
    getSupplierAnalytics(),
    getStockMovementTrend()
  ]);

  return NextResponse.json({
    success: true,
    data: {
      ...supplierStats,
      stockMovementTrend: stockTrend
    }
  });
}