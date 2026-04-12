import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

// GET ALL CATEGORIES
export async function GET() {
  await requireAuth();

  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return NextResponse.json({
    success: true,
    data: categories,
  });
}

// CREATE CATEGORY
export async function POST(req: Request) {
  await requireAuth("ADMIN");

  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { success: false, error: "Category name required" },
      { status: 400 },
    );
  }

  // check duplicate
  const existing = await prisma.category.findUnique({
    where: { name: body.name },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, error: "Category already exists" },
      { status: 400 },
    );
  }

  const category = await prisma.category.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json({
    success: true,
    data: category,
  });
}
