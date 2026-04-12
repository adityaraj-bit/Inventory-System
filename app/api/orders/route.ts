import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

// GET ORDERS (Unified)
export async function GET(req: Request) {
  await requireAuth();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  const where: any = {};
  if (type) where.type = type;
  if (status) where.status = status;

  const orders = await prisma.order.findMany({
    where,
    include: {
      customer: true,
      supplier: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          items: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    data: orders,
  });
}

// CREATE ORDER
export async function POST(req: Request) {
  const auth = await requireAuth();

  const body = await req.json();

  if (!body.type || !body.items || body.items.length === 0) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Validate items
  for (const item of body.items) {
    if (item.quantity <= 0 || item.price < 0) {
      return NextResponse.json(
        { success: false, error: "Item quantity must be greater than 0 and price must be non-negative" },
        { status: 400 }
      );
    }
  }

  // Calculate total amount if not provided
  let totalAmount = body.totalAmount;
  if (!totalAmount) {
    totalAmount = body.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          type: body.type,
          customerId: body.type === "SALE" ? body.customerId : null,
          supplierId: body.type === "PURCHASE" ? body.supplierId : null,
          status: body.status || "PENDING",
          totalAmount: totalAmount,
          createdBy: auth.userId,
          items: {
            create: body.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // If order is COMPLETED upon creation (unlikely but possible), update stock
      if (newOrder.status === "COMPLETED") {
        for (const item of body.items) {
          const stockChange = body.type === "PURCHASE" ? item.quantity : -item.quantity;
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

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
