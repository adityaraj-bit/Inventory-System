import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: params.id },
    data: {
      role: body.role,
      isActive: body.isActive,
    },
  });


  return NextResponse.json({
    success: true,
    data: user,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireAuth("ADMIN");

  await prisma.user.update({
    where: { id: params.id },
    data: { isActive: false },
  });


  return NextResponse.json({
    success: true,
  });
}
