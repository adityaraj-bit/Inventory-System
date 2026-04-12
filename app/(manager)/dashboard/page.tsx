"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { getDashboardAnalytics } from "@/services/analytics";
import { useQuery } from "@tanstack/react-query";
import MetricCard from "@/components/analytics/metric-card";
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle,
  Layers,
  Activity
} from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAnalytics,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-12">
        <h1 className="text-6xl font-black text-foreground tracking-tighter uppercase leading-[0.85]">
          Executive <br /> <span className="text-primary italic">Terminal</span>
        </h1>
        <p className="text-muted-foreground mt-4 font-medium text-lg max-w-md">
          Centralized command for inventory operations and real-time capital flow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Registry"
          value={data.totalProducts}
          icon={<Layers size={20} />}
          description="Unique items in database"
        />

        <MetricCard
          title="Yield Forecast"
          value={`₹${data.revenue.toLocaleString()}`}
          icon={<Activity size={20} />}
          trend={{ value: 8.4, isPositive: true }}
          description="Current billing cycle volume"
        />

        <MetricCard
          title="Unit Volume"
          value={data.inventoryUnits}
          icon={<Package size={20} />}
          description="Gross physical items on hand"
        />

        <MetricCard
          title="Outbound Velocity"
          value={data.totalSalesOrders}
          icon={<ArrowUpRight size={20} />}
          description="Dispatched fulfillment requests"
        />

        <MetricCard
          title="Inbound Pipeline"
          value={data.totalPurchaseOrders}
          icon={<ArrowDownRight size={20} />}
          description="Pending procurement arrival"
        />

        <MetricCard
          title="Failure Risk"
          value={data.lowStockCount}
          icon={<AlertTriangle size={20} className={data.lowStockCount > 0 ? "text-rose-500" : ""} />}
          description="Units below replenishment point"
        />
      </div>
    </DashboardLayout>
  );
}