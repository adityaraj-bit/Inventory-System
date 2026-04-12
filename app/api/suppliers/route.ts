import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";


// GET ALL SUPPLIERS
export async function GET() {
  await requireAuth();

  const suppliers = await prisma.supplier.findMany({
    where: {
      isActive: true,
    },
    include: {
      _count: {
        select: {
          products: true,
          orders: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    success: true,
    data: suppliers,
  });
}


// CREATE SUPPLIER
export async function POST(req: Request) {
  await requireAuth("ADMIN");

  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { success: false, error: "Supplier name required" },
      { status: 400 }
    );
  }

  const existing = await prisma.supplier.findUnique({
    where: { name: body.name },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, error: "Supplier already exists" },
      { status: 400 }
    );
  }

  const supplier = await prisma.supplier.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  });

  return NextResponse.json({
    success: true,
    data: supplier,
  });
}