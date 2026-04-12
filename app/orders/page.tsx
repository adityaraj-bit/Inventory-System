"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { orderColumns } from "@/components/orders/order-columns";
import { getOrders } from "@/services/orders";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function OrdersPage() {
  const [type, setType] = useState<string | undefined>(undefined);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", type],
    queryFn: () => getOrders({ type }),
  });

  return (
    <DashboardLayout>
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black text-foreground tracking-tighter uppercase leading-[0.85]">
            Operational <br /> <span className="text-primary italic">Pipeline</span>
          </h1>
          <p className="text-muted-foreground mt-4 font-medium text-lg max-w-md">
            Transactional log of all procurement and fulfillment protocols.
          </p>
        </div>
        
        <div className="flex gap-3">
          <select 
            className="bg-surface-low border border-border/10 rounded-sm px-4 py-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
            value={type || ""}
            onChange={(e) => setType(e.target.value || undefined)}
          >
            <option value="">Protocol: All</option>
            <option value="SALE">Protocol: Extraction</option>
            <option value="PURCHASE">Protocol: Procurement</option>
          </select>

          <Link
            href="/orders/create"
            className="px-6 py-3 bg-gradient-to-br from-primary to-[#4D80FF] text-white rounded-sm text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(174,198,255,0.3)] flex items-center justify-center gap-2"
          >
            Initialize Order
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>
      ) : (
        <DataTable columns={orderColumns} data={data || []} />
      )}
    </DashboardLayout>
  );
}
