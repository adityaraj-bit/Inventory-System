"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import DataTable from "@/components/tables/data-table";
import { productColumns } from "@/components/products/product-columns";
import { getProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <DashboardLayout>
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black text-foreground tracking-tighter uppercase leading-[0.85]">
            Product <br /> <span className="text-primary italic">Registry</span>
          </h1>
          <p className="text-muted-foreground mt-4 font-medium text-lg max-w-md">
            Comprehensive catalog of physical assets and inventory specifications.
          </p>
        </div>

        <Link
          href="/products/create"
          className="px-6 py-3 bg-gradient-to-br from-primary to-[#4D80FF] text-white rounded-sm text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(174,198,255,0.3)] flex items-center justify-center gap-2"
        >
          Initialize Product
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>
      ) : (
        <DataTable columns={productColumns} data={data} />
      )}
    </DashboardLayout>
  );
}