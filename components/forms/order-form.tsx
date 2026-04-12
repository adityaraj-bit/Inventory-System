"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";
import { getCustomers } from "@/services/customers";
import { getSuppliers } from "@/services/suppliers";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export default function OrderForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const [type, setType] = useState<"SALE" | "PURCHASE">("SALE");
  const [entityId, setEntityId] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const { data: products } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const { data: customers } = useQuery({ queryKey: ["customers"], queryFn: getCustomers, enabled: type === "SALE" });
  const { data: suppliers } = useQuery({ queryKey: ["suppliers"], queryFn: getSuppliers, enabled: type === "PURCHASE" });

  const addItem = () => {
    const product = products?.find((p: any) => p.id === selectedProductId);
    if (!product) return;

    setItems([...items, {
      productId: product.id,
      name: product.name,
      quantity,
      price: price || product.price,
    }]);

    setSelectedProductId("");
    setQuantity(1);
    setPrice(0);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !entityId) return;

    onSubmit({
      type,
      customerId: type === "SALE" ? entityId : undefined,
      supplierId: type === "PURCHASE" ? entityId : undefined,
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      status: "PENDING",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl bg-surface-low p-10 rounded-sm border border-border/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">Protocol Type</label>
          <select 
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer font-medium"
            value={type}
            onChange={(e) => {
              setType(e.target.value as any);
              setEntityId("");
            }}
          >
            <option value="SALE">Extraction (Sale)</option>
            <option value="PURCHASE">Procurement (Purchase)</option>
          </select>
        </div>

        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">
            {type === "SALE" ? "Target Customer" : "Primary Vendor"}
          </label>
          <select 
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer font-medium"
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
            required
          >
            <option value="">Select Protocol Target</option>
            {(type === "SALE" ? customers : suppliers)?.map((e: any) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-border/5 pt-8">
        <div className="mb-6 space-y-1">
          <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Telemetry Registration</h3>
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest italic">Add line items to protocol</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5 space-y-1.5">
            <label className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Registry Asset</label>
            <select 
              className="w-full bg-surface-lowest/80 border border-border/10 px-4 py-2.5 text-xs focus:outline-none focus:border-primary/50 transition-all cursor-pointer font-medium"
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                const p = products?.find((prod: any) => prod.id === e.target.value);
                if (p) setPrice(p.price);
              }}
            >
              <option value="">Select Asset...</option>
              {products?.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Volume</label>
            <input 
              type="number"
              placeholder="Qty"
              min="1"
              className="w-full bg-surface-lowest/80 border border-border/10 px-4 py-2.5 text-xs focus:outline-none focus:border-primary/50 transition-all font-mono"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="sm:col-span-3 space-y-1.5">
            <label className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Rate (₹)</label>
            <input 
              type="number"
              placeholder="Price"
              min="0"
              step="0.01"
              className="w-full bg-surface-lowest/80 border border-border/10 px-4 py-2.5 text-xs focus:outline-none focus:border-primary/50 transition-all font-mono"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <button 
            type="button"
            onClick={addItem}
            className="sm:col-span-2 bg-surface-highest hover:bg-primary hover:text-primary-foreground py-2.5 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] transition-all"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-8 bg-surface-lowest/50 rounded-sm border border-border/5 overflow-hidden">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="bg-surface-high/50 border-b border-border/5">
              <th className="px-4 py-3 text-left font-black uppercase tracking-widest text-muted-foreground/60">Asset Registry</th>
              <th className="px-4 py-3 text-right font-black uppercase tracking-widest text-muted-foreground/60">Vol</th>
              <th className="px-4 py-3 text-right font-black uppercase tracking-widest text-muted-foreground/60">Rate</th>
              <th className="px-4 py-3 text-right font-black uppercase tracking-widest text-muted-foreground/60">Metric</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/5">
            {items.map((item, i) => (
              <tr key={i} className="group hover:bg-surface-high/30 transition-colors font-medium">
                <td className="px-4 py-3 text-foreground font-bold tracking-tight uppercase">{item.name}</td>
                <td className="px-4 py-3 text-right text-muted-foreground font-mono">{item.quantity}</td>
                <td className="px-4 py-3 text-right text-muted-foreground font-mono">₹{item.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-foreground font-black font-mono">₹{(item.quantity * item.price).toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => removeItem(i)} className="text-muted-foreground/30 hover:text-rose-500 transition-colors">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-surface-high/20">
            <tr className="font-black border-t border-border/10">
              <td colSpan={3} className="px-4 py-4 text-right text-muted-foreground uppercase tracking-widest text-[10px]">Aggregated Value:</td>
              <td className="px-4 py-4 text-right text-primary text-sm tracking-tighter font-black font-mono">₹{items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toLocaleString()}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button 
        type="submit"
        disabled={items.length === 0 || !entityId}
        className="w-full bg-gradient-to-br from-primary to-[#4D80FF] text-primary-foreground font-black text-[10px] uppercase tracking-[0.3em] py-4 rounded-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(174,198,255,0.2)] disabled:opacity-50 disabled:grayscale disabled:scale-100 disabled:shadow-none"
      >
        Authorize Entry Protocol
      </button>
    </form>

  );
}
