import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";


// UPDATE CUSTOMER
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const auth = await requireAuth();

  const body = await req.json();

  const customer = await prisma.customer.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  });


  return NextResponse.json({
    success: true,
    data: customer,
  });
}


// DELETE CUSTOMER (ADMIN ONLY)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const auth = await requireAuth("ADMIN");

  await prisma.customer.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}