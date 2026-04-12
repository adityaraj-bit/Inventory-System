"use client";

import { motion } from "framer-motion";
import { User, DollarSign } from "lucide-react";

interface TopCustomersProps {
  customers: {
    name: string;
    totalSpend: number;
  }[];
}

export default function TopCustomers({ customers }: TopCustomersProps) {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-[0.2em]">
            Client Analytics
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium italic">Protocol: Segment Valuation</p>
        </div>
        <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-2 py-0.5 rounded-full">
          LTV Optimized
        </span>
      </div>

      <div className="space-y-1">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-sm border border-transparent hover:bg-surface-high transition-all group cursor-default"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-surface-lowest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                <User size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-foreground tracking-tight uppercase text-sm leading-tight transition-colors group-hover:text-primary truncate">
                  {customer.name}
                </p>
                <div className="flex items-center gap-2 mt-1.5 overflow-hidden">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 whitespace-nowrap">Tier: Platinum</span>
                  <div className="w-1 h-1 rounded-full bg-primary/20 shrink-0" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 whitespace-nowrap">Active Status</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-foreground text-lg tracking-tighter transition-transform group-hover:scale-110 origin-right">
                <span className="text-xs font-bold text-muted-foreground mr-1 italic text-[10px] leading-none">$</span>
                {customer.totalSpend.toLocaleString()}
              </p>
              <div className="w-20 h-0.5 bg-surface-highest mt-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 group-hover:w-full" 
                  style={{ width: `${(customer.totalSpend / customers[0]?.totalSpend || 1) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        {customers.length === 0 && (
          <div className="text-center py-20 bg-surface-lowest/50 rounded-sm border border-dashed border-border/10">
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em]">Telemetry Data Unavailable</p>
          </div>
        )}
      </div>
    </div>
  );
}
