"use client";

import { ColumnDef } from "@tanstack/react-table";

export const orderColumns: ColumnDef<any>[] = [
  {
    header: "Registry ID",
    accessorKey: "id",
    cell: ({ row }) => <span className="text-[10px] font-mono text-muted-foreground/40 font-bold uppercase tracking-tighter">[{row.original.id.slice(0, 8)}]</span>
  },
  {
    header: "Protocol",
    accessorKey: "type",
    cell: ({ row }) => (
      <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest ${
        row.original.type === "SALE" ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(174,198,255,0.1)]" : "bg-surface-highest text-muted-foreground"
      }`}>
        {row.original.type}
      </span>
    )
  },
  {
    header: "Target Entity",
    cell: ({ row }) => {
      const entity = row.original.type === "SALE" ? row.original.customer?.name : row.original.supplier?.name;
      return <span className="font-bold text-foreground text-xs uppercase tracking-tight">{entity || "—"}</span>;
    }
  },
  {
    header: "Telemetry Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest ${
        row.original.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-400" :
        row.original.status === "CANCELLED" ? "bg-rose-500/10 text-rose-400" :
        "bg-primary/10 text-primary animate-pulse"
      }`}>
        {row.original.status}
      </span>
    )
  },
  {
    header: "Amount",
    cell: ({ row }) => `₹${row.original.totalAmount?.toLocaleString() || "0"}`
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  }
];
