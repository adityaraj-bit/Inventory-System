"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function MetricCard({
  title,
  value,
  icon,
  description,
  trend
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-surface-low p-8 rounded-sm flex flex-col justify-between transition-all hover:bg-surface-high h-full group cursor-default shadow-sm border border-border/5"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1 overflow-hidden">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            {title}
          </p>
          <h3 className="text-4xl font-black text-foreground tracking-tighter transition-transform group-hover:scale-[1.02] origin-left truncate">
            {value}
          </h3>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-surface-lowest text-primary rounded-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground shrink-0 border border-border/5">
          {icon}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border/5 pt-5">
        {description && (
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest truncate max-w-[150px]">
            {description}
          </p>
        )}
        {trend && (
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm ${
            trend.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
          }`}>
            {trend.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span className="text-[10px] font-black uppercase tracking-tighter">{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
