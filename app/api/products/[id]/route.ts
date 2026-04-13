import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

// GET SINGLE PRODUCT
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await requireAuth();

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      supplier: true,
    },
  });

  if (!product) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: product,
  });
}

// UPDATE PRODUCT
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await requireAuth("ADMIN");

  const body = await req.json();

  if ((body.price !== undefined && body.price < 0) || (body.stock !== undefined && body.stock < 0)) {
    return NextResponse.json(
      { success: false, error: "Price and Stock must be non-negative" },
      { status: 400 }
    );
  }


  const existing = await prisma.product.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 },
    );
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      categoryId: body.categoryId,
      supplierId: body.supplierId,
      isActive: body.isActive,
    },
  });

  return NextResponse.json({
    success: true,
    data: product,
  });
}

// SOFT DELETE PRODUCT
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await requireAuth("ADMIN");

  await prisma.product.update({
    where: { id },
    data: { isActive: false },
  });

  return NextResponse.json({
    success: true,
  });
}
