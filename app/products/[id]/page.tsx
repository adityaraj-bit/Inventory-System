"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { getProduct } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProduct(params.id as string),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        {data.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">
            Product Info
          </h2>

          <div className="space-y-2">
            <p><span className="text-gray-500">SKU:</span> {data.sku}</p>
            <p><span className="text-gray-500">Price:</span> ₹{data.price}</p>
            <p><span className="text-gray-500">Category:</span> {data.category?.name}</p>
            <p><span className="text-gray-500">Supplier:</span> {data.supplier?.name || "—"}</p>
            <p><span className="text-gray-500">Description:</span> {data.description || "—"}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-3">
            Inventory Level
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold">{data.stock}</span>
            <span className="text-gray-500">Units in stock</span>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}