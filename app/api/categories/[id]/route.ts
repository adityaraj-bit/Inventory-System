import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";


// UPDATE CATEGORY
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const category = await prisma.category.update({
    where: { id: params.id },
    data: {
      name: body.name,
      isActive: body.isActive,
    },
  });


  return NextResponse.json({
    success: true,
    data: category,
  });
}


// SOFT DELETE CATEGORY
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth("ADMIN");

  const category = await prisma.category.update({
    where: { id: params.id },
    data: {
      isActive: false,
    },
  });

  return NextResponse.json({
    success: true,
  });
}