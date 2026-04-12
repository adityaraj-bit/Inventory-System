import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";


// UPDATE SUPPLIER
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const supplier = await prisma.supplier.update({
    where: { id: params.id },
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
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  const supplier = await prisma.supplier.update({
    where: { id: params.id },
    data: {
      isActive: false,
    },
  });


  return NextResponse.json({
    success: true,
  });
}