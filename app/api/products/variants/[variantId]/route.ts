import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ variantId: string }> }
) {
  const { variantId } = await context.params;
  await requireAuth();

  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true
        }
      }
    }
  });

  if (!variant) {
    return NextResponse.json(
      { success: false, error: "Variant not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: variant
  });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ variantId: string }> }
) {
  const { variantId } = await context.params;
  await requireAuth("ADMIN");

  const body = await req.json();

  const variant = await prisma.productVariant.update({
    where: { id: variantId },
    data: {
      sku: body.sku,
      attributes: body.attributes
    }
  });

  return NextResponse.json({
    success: true,
    data: variant
  });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ variantId: string }> }
) {
  const { variantId } = await context.params;
  await requireAuth("ADMIN");

  await prisma.productVariant.delete({
    where: { id: variantId }
  });

  return NextResponse.json({
    success: true,
    message: "Variant deleted"
  });
}