import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

// GET PRODUCTS
export async function GET() {
  await requireAuth();

  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      supplier: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    data: products,
  });
}

// CREATE PRODUCT
export async function POST(req: NextRequest) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  if (!body.name || !body.sku || !body.categoryId || body.price === undefined) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (body.price < 0 || (body.stock !== undefined && body.stock < 0)) {
    return NextResponse.json(
      { success: false, error: "Price and Stock must be non-negative" },
      { status: 400 }
    );
  }

  // check duplicate SKU
  const existing = await prisma.product.findUnique({
    where: { sku: body.sku },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, error: "SKU already exists" },
      { status: 400 }
    );
  }

  // validate category
  const category = await prisma.category.findUnique({
    where: { id: body.categoryId },
  });

  if (!category) {
    return NextResponse.json(
      { success: false, error: "Invalid category" },
      { status: 400 }
    );
  }

  // validate supplier (optional)
  if (body.supplierId) {
    const supplier = await prisma.supplier.findUnique({
      where: { id: body.supplierId },
    });

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: "Invalid supplier" },
        { status: 400 }
      );
    }
  }

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      sku: body.sku,
      price: body.price,
      stock: body.stock || 0,
      categoryId: body.categoryId,
      supplierId: body.supplierId,
    },
  });

  return NextResponse.json({
    success: true,
    data: product,
  });
}