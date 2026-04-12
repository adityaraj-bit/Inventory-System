import { apiFetch } from "@/lib/api";

export const getOrders = async (params?: { type?: string; status?: string }) => {
  const searchParams = new URLSearchParams();
  if (params?.type) searchParams.append("type", params.type);
  if (params?.status) searchParams.append("status", params.status);
  
  const queryString = searchParams.toString();
  const url = `/api/orders${queryString ? `?${queryString}` : ""}`;
  
  const res = await apiFetch(url);
  return res.data;
};

export const getOrder = async (id: string) => {
  const res = await apiFetch(`/api/orders/${id}`);
  return res.data;
};

export const createOrder = (data: any) =>
  apiFetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateOrderStatus = (id: string, status: string) =>
  apiFetch(`/api/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
