import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import { parse } from "csv-parse/sync";

type ProductCSV = {
  name: string;
  sku: string;
  price: string;
  categoryId: string;
  supplierId: string;
};

export async function POST(req: NextRequest) {

  const auth = await requireAuth("ADMIN");

  const text = await req.text();

  const records = parse(text, {
    columns: true,
    skip_empty_lines: true
  }) as ProductCSV[];

  const products = [];

  for (const row of records) {

    const product = await prisma.product.create({
      data: {
        name: row.name,
        sku: row.sku,
        price: Number(row.price),
        categoryId: row.categoryId,
        supplierId: row.supplierId
      }
    });



    products.push(product);
  }

  return NextResponse.json({
    success: true,
    count: products.length
  });
}