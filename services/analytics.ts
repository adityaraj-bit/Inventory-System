import { apiFetch } from "@/lib/api";

export const getDashboardAnalytics = async () =>{
  const res = await apiFetch("/api/analytics/dashboard");
  return res.data;
}

export const getSalesAnalytics = async () =>{
  const res = await apiFetch("/api/analytics/sales");
  return res.data;
}

export const getProductAnalytics = async () =>{
  const res = await apiFetch("/api/analytics/products");
  return res.data;
}

export const getSupplierAnalytics = async () =>{
  const res = await apiFetch("/api/analytics/suppliers");
  return res.data;
}

export const getProfitabilityAnalytics = async () =>{
  const res = await apiFetch("/api/analytics/profitability");
  return res.data;
}