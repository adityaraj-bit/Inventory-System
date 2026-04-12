"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import Link from "next/link";
import { deleteProduct } from "@/services/products";

export const productColumns: ColumnDef<Product>[] = [
  {
    header: "Asset Identity",
    accessorKey: "name",
    cell: ({ row }) => <span className="font-black text-foreground uppercase tracking-tight">{row.original.name}</span>
  },
  {
    header: "Asset SKU",
    accessorKey: "sku",
    cell: ({ row }) => <span className="text-[11px] font-mono text-muted-foreground/60">{row.original.sku}</span>
  },
  {
    header: "Registry Segment",
    cell: ({ row }) => <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{row.original.category?.name}</span>,
  },
  {
    header: "Value",
    cell: ({ row }) => <span className="font-black text-foreground font-mono">₹{row.original.price.toLocaleString()}</span>,
  },
  {
    header: "Availability",
    accessorKey: "stock",
    cell: ({ row }) => (
      <span className={`font-black font-mono ${row.original.stock < 100 ? "text-rose-400" : "text-primary"}`}>
        {row.original.stock}
      </span>
    )
  },
  {
    header: "Protocols",
    cell: ({ row }) => {
      const id = row.original.id;

      const handleDelete = async () => {
        if (!confirm("Terminate registry entry?")) return;
        await deleteProduct(id);
        window.location.reload();
      };

      return (
        <div className="flex gap-4">
          <Link
            href={`/products/${id}`}
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Inspect
          </Link>

          <Link
            href={`/products/${id}/edit`}
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            Modify
          </Link>

          <button
            onClick={handleDelete}
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 hover:text-rose-500 transition-colors"
          >
            Purge
          </button>
        </div>
      );
    },
  },
];