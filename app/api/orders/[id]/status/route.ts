import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await requireAuth();

  const body = await req.json();
  const { status } = body;

  if (!status) {
    return NextResponse.json(
      { success: false, error: "Status is required" },
      { status: 400 }
    );
  }

  try {
    const updatedOrder = await prisma.$transaction(async (tx) => {
      const currentOrder = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!currentOrder) {
        throw new Error("Order not found");
      }

      // If transition to COMPLETED, update stock
      if (status === "COMPLETED" && currentOrder.status !== "COMPLETED") {
        for (const item of currentOrder.items) {
          const stockChange = currentOrder.type === "PURCHASE" ? item.quantity : -item.quantity;
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: stockChange,
              },
            },
          });
        }
      } 
      // If transition AWAY from COMPLETED (e.g. CANCELLED late), reverse stock? 
      // Usually, we don't allow this or handle it specifically.
      // For simplicity, we'll only handle COMPLETED transitions.

      return await tx.order.update({
        where: { id },
        data: { status },
      });
    });

    return NextResponse.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
