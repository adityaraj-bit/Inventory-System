import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/authGuard";
import AdmZip from "adm-zip";
import { parse } from "csv-parse/sync";

export async function POST(req: NextRequest) {
  const auth = await requireAuth("ADMIN");

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { success: false, error: "CSV zip file required" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const zip = new AdmZip(buffer);

  const entries = zip.getEntries();

  const csvMap: Record<string, any[]> = {};

  const booleanFields = new Set(["isActive"]);

  const numberFields = new Set([
    "price",
    "totalAmount",
    "stock",
    "quantity",
  ]);

  const dateFields = new Set([
    "createdAt",
    "updatedAt",
  ]);

  const restoreOrder = [
    "users",
    "categories",
    "suppliers",
    "customers",
    "products",
    "orders",
    "order_items",
  ];

  for (const name of restoreOrder) {
    const entry = entries.find(e => e.entryName === `${name}.csv`);
    if (!entry) continue;

    const csvData = entry.getData().toString("utf8");

    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    }).map((row: any) => {
      const converted: any = {};

      for (const key in row) {
        let value = row[key];

        if (value === "") {
          converted[key] = null;
          continue;
        }

        if (booleanFields.has(key)) {
          value = value === "true";
        } else if (numberFields.has(key)) {
          value = Number(value);
        } else if (dateFields.has(key)) {
          value = new Date(value);
        }

        converted[key] = value;
      }

      return converted;
    });

    csvMap[name] = records;
  }

  try {
    await prisma.$transaction(async (tx) => {
      // ⚠ clear database first in correct order
      await tx.orderItem.deleteMany();
      await tx.order.deleteMany();
      await tx.product.deleteMany();
      await tx.customer.deleteMany();
      await tx.supplier.deleteMany();
      await tx.category.deleteMany();
      await tx.user.deleteMany();

      // USERS
      if (csvMap.users) {
        await tx.user.createMany({
          data: csvMap.users,
          skipDuplicates: true,
        });
      }

      // CATEGORIES
      if (csvMap.categories) {
        await tx.category.createMany({
          data: csvMap.categories,
          skipDuplicates: true,
        });
      }

      // SUPPLIERS
      if (csvMap.suppliers) {
        await tx.supplier.createMany({
          data: csvMap.suppliers,
          skipDuplicates: true,
        });
      }

      // CUSTOMERS
      if (csvMap.customers) {
        await tx.customer.createMany({
          data: csvMap.customers,
          skipDuplicates: true,
        });
      }

      // PRODUCTS
      if (csvMap.products) {
        await tx.product.createMany({
          data: csvMap.products,
          skipDuplicates: true,
        });
      }

      // ORDERS
      if (csvMap.orders) {
        await tx.order.createMany({
          data: csvMap.orders,
          skipDuplicates: true,
        });
      }

      // ORDER ITEMS
      if (csvMap.order_items) {
        await tx.orderItem.createMany({
          data: csvMap.order_items,
          skipDuplicates: true,
        });
      }
    }, { timeout: 60000 });

    return NextResponse.json({
      success: true,
      message: "Database restored from simplified CSV backup package",
    });
  } catch (error: any) {
    console.error("Restore Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to restore database: " + error.message },
      { status: 500 }
    );
  }
}
