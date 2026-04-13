import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
 await requireAuth();

 const variants = await prisma.productVariant.findMany({
   where: { productId: id }
 });

 return NextResponse.json({
   success: true,
   data: variants
 });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
 const auth = await requireAuth("ADMIN");

 const body = await req.json();

 const variant = await prisma.productVariant.create({
   data: {
     productId: id,
     sku: body.sku,
     attributes: body.attributes
   }
 });

 return NextResponse.json({
   success: true,
   data: variant
 });
}