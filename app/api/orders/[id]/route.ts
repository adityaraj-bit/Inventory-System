import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await requireAuth();

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      customer: true,
      supplier: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json(
      { success: false, error: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: order,
  });
}
