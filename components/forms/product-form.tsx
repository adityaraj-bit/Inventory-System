"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories";
import { getSuppliers } from "@/services/suppliers";

export default function ProductForm({
  onSubmit,
  defaultValues = {},
}: {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}) {
  const [name, setName] = useState(defaultValues.name || "");
  const [sku, setSku] = useState(defaultValues.sku || "");
  const [price, setPrice] = useState(defaultValues.price || "");
  const [stock, setStock] = useState(defaultValues.stock || 0);
  const [categoryId, setCategoryId] = useState(defaultValues.categoryId || "");
  const [supplierId, setSupplierId] = useState(defaultValues.supplierId || "");
  const [description, setDescription] = useState(defaultValues.description || "");

  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const { data: suppliers } = useQuery({ queryKey: ["suppliers"], queryFn: getSuppliers });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      sku,
      price: Number(price),
      stock: Number(stock),
      categoryId,
      supplierId: supplierId || null,
      description,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-2xl bg-surface-low p-10 rounded-sm border border-border/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">Registry Name</label>
          <input
            placeholder="e.g. AX-200 CORE"
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">Asset SKU</label>
          <input
            placeholder="SKU-ETH-001"
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 font-medium"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">Unit Value (₹)</label>
          <input
            placeholder="0.00"
            type="number"
            step="0.01"
            min="0"
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 font-medium"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">Logistics Quota</label>
          <input
            placeholder="0"
            type="number"
            min="0"
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 font-medium"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">Registry Segment</label>
          <select
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer font-medium"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Segment</option>
            {categories?.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">Primary Vendor</label>
          <select
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer font-medium"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
          >
            <option value="">Select Vendor (Optional)</option>
            {suppliers?.map((s: any) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 space-y-1.5 focus-within:translate-x-1 transition-transform group">
          <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] pl-1 group-focus-within:text-primary transition-colors">Asset Specifications</label>
          <textarea
            placeholder="Detailed telemetry and specification notes..."
            className="w-full bg-surface-lowest/80 border border-border/10 px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/30 h-32 font-medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <button className="w-full bg-gradient-to-br from-primary to-[#4D80FF] text-primary-foreground font-black text-[10px] uppercase tracking-[0.3em] py-4 rounded-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(174,198,255,0.2)]">
        Commit Registry Entry
      </button>
    </form>
  );
}