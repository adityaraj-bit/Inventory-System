"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import OrderForm from "@/components/forms/order-form";
import { createOrder } from "@/services/orders";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateOrderPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    try {
      await createOrder(data);
      toast.success("Order created successfully");
      router.push("/orders");
    } catch (error: any) {
      toast.error(error.message || "Failed to create order");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
        <OrderForm onSubmit={handleCreate} />
      </div>
    </DashboardLayout>
  );
}
