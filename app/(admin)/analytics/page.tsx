"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  getSalesAnalytics,
  getProductAnalytics,
  getSupplierAnalytics,
  getDashboardAnalytics,
  getProfitabilityAnalytics
} from "@/services/analytics";

import { useQuery } from "@tanstack/react-query";
import RoleGuard from "@/components/auth/RoleGuard";
import MetricCard from "@/components/analytics/metric-card";
import CategoryDistribution from "@/components/analytics/category-distribution";
import ProfitabilityChart from "@/components/analytics/profitability-chart";
import TopCustomers from "@/components/analytics/top-customers";
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  ShoppingBag,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const stats = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardAnalytics
  });

  const sales = useQuery({
    queryKey: ["sales-analytics"],
    queryFn: getSalesAnalytics
  });

  const products = useQuery({
    queryKey: ["product-analytics"],
    queryFn: getProductAnalytics
  });

  const profitability = useQuery({
    queryKey: ["profitability-analytics"],
    queryFn: getProfitabilityAnalytics
  });

  const suppliers = useQuery({
    queryKey: ["supplier-analytics"],
    queryFn: getSupplierAnalytics
  });

  const isLoading = stats.isLoading || sales.isLoading || products.isLoading || profitability.isLoading;

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
    <RoleGuard allowedRoles={["ADMIN"]}>
      <DashboardLayout>
        <div className="mb-12">
          <h1 className="text-6xl font-black text-foreground tracking-tighter uppercase leading-[0.85]">
            System <br /> <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-muted-foreground mt-4 font-medium text-lg max-w-md">
            High-fidelity business metrics and operational performance telemetry.
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <MetricCard
            title="Gross Revenue"
            value={`$${stats.data?.revenue?.toLocaleString() || 0}`}
            icon={<DollarSign size={20} />}
            trend={{ value: 12.5, isPositive: true }}
            description="Aggregated fiscal volume"
          />
          <MetricCard
            title="Capital Locked"
            value={`$${stats.data?.inventoryValue?.toLocaleString() || 0}`}
            icon={<Package size={20} />}
            description="Asset valuation in storage"
          />
          <MetricCard
            title="Order Velocity"
            value={`$${sales.data?.averageOrderValue?.toFixed(2) || 0}`}
            icon={<TrendingUp size={20} />}
            trend={{ value: 4.2, isPositive: true }}
            description="Mean transactional value"
          />
          <MetricCard
            title="Critical Stock"
            value={stats.data?.lowStockCount || 0}
            icon={<AlertTriangle size={20} className={stats.data?.lowStockCount > 0 ? "text-rose-500" : ""} />}
            description="Items below safety limit"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12">
          {/* Main Profitability Chart */}
          <div className="lg:col-span-8">
            <div className="bg-surface-low p-8 rounded-sm h-full">
               <ProfitabilityChart data={profitability.data || []} />
            </div>
          </div>

          {/* Top Customers */}
          <div className="lg:col-span-4">
            <div className="bg-surface-low p-8 rounded-sm h-full">
               <TopCustomers customers={sales.data?.topCustomers || []} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Category Distribution */}
          <div className="lg:col-span-4">
            <div className="bg-surface-low p-8 rounded-sm h-full">
              <CategoryDistribution data={products.data?.categoryDistribution || []} />
            </div>
          </div>

          {/* Top Products Table */}
          <div className="lg:col-span-8 bg-surface-low p-8 rounded-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-foreground uppercase tracking-[0.2em]">
                  Asset Liquidity
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Top Selling Units</p>
              </div>
              <ShoppingBag size={20} className="text-primary/40" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/5">
                    <th className="pb-4">Registry Name</th>
                    <th className="pb-4 text-right">Volume</th>
                    <th className="pb-4 text-right">Yield</th>
                    <th className="pb-4 text-right">Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/5">
                  {products.data?.topSellingProducts?.map((p: any) => (
                    <tr key={p.id} className="group hover:bg-surface-high transition-colors">
                      <td className="py-4 font-bold text-foreground tracking-tight">{p.name}</td>
                      <td className="py-4 text-right text-muted-foreground font-mono">{p.sales}</td>
                      <td className="py-4 text-right text-foreground font-bold font-mono">${(p.sales * p.price).toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black rounded-full uppercase tracking-tighter">
                          High Yield
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Supplier Performance Section */}
        <div className="mt-12 bg-surface-lowest p-12 rounded-sm relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity rotate-12">
            <Users size={400} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:max-w-xs space-y-4">
              <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase leading-tight">Supply <br /> <span className="text-primary">Network</span></h2>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                Critical telemetry from the vendor ecosystem. Monitoring fulfillment reliability and capital outflow.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
              {suppliers.data?.supplierPerformance?.slice(0, 4).map((s: any) => (
                <div key={s.id} className="bg-surface-low p-6 rounded-sm border border-border/5 hover:border-primary/20 transition-all flex flex-col justify-between group/item">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{s.name}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-foreground tracking-tighter">{s.orders}</span>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Transfers</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-[11px] font-bold text-primary tracking-widest uppercase">${s.totalSpent.toLocaleString()}</p>
                    <div className="w-full h-1 bg-surface-highest mt-2 overflow-hidden">
                      <div className="h-full bg-primary w-2/3 group-hover/item:w-full transition-all duration-700"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}