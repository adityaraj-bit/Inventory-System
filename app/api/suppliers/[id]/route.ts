import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";


// UPDATE SUPPLIER
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const supplier = await prisma.supplier.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      isActive: body.isActive,
    },
  });


  return NextResponse.json({
    success: true,
    data: supplier,
  });
}


// SOFT DELETE SUPPLIER
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const auth = await requireAuth("ADMIN");

  const supplier = await prisma.supplier.update({
    where: { id },
    data: {
      isActive: false,
    },
  });


  return NextResponse.json({
    success: true,
  });
}