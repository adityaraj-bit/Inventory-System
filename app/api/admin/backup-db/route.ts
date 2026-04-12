import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/authGuard";
import AdmZip from "adm-zip";

function toCSV(data: any[]) {
  if (!data || !data.length) return "";

  const headers = Object.keys(data[0]);

  const rows = data.map(row =>
    headers.map(h => {
      let v = row[h];
      if (v instanceof Date) v = v.toISOString();
      return JSON.stringify(v ?? "").replace(/\\"/g, '""'); // basic CSV escaping
    }).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export async function GET() {
  await requireAuth("ADMIN");

  const zip = new AdmZip();

  const [
    users,
    categories,
    suppliers,
    customers,
    products,
    orders,
    orderItems,
  ] = await Promise.all([
    prisma.user.findMany(),
    prisma.category.findMany(),
    prisma.supplier.findMany(),
    prisma.customer.findMany(),
    prisma.product.findMany(),
    prisma.order.findMany(),
    prisma.orderItem.findMany(),
  ]);

  zip.addFile("users.csv", Buffer.from(toCSV(users)));
  zip.addFile("categories.csv", Buffer.from(toCSV(categories)));
  zip.addFile("suppliers.csv", Buffer.from(toCSV(suppliers)));
  zip.addFile("customers.csv", Buffer.from(toCSV(customers)));
  zip.addFile("products.csv", Buffer.from(toCSV(products)));
  zip.addFile("orders.csv", Buffer.from(toCSV(orders)));
  zip.addFile("order_items.csv", Buffer.from(toCSV(orderItems)));

  const zipBuffer = zip.toBuffer();

  return new Response(zipBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=backup.zip"
    }
  });
}