import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const auth = await requireAuth("ADMIN");

  const body = await req.json();

  const user = await prisma.user.update({
    where: { id },
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
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const auth = await requireAuth("ADMIN");

  await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });


  return NextResponse.json({
    success: true,
  });
}
