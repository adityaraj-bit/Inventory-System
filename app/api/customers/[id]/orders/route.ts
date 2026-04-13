import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
 await requireAuth();

 const orders = await prisma.salesOrder.findMany({
   where: { customerId: id },
   include: {
     items: { include: { product: true } }
   }
 });

 return NextResponse.json({
   success: true,
   data: orders
 });
}