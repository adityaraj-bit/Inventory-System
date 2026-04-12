"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { motion } from "framer-motion";

interface CategoryDistributionProps {
  data: {
    name: string;
    stockCount: number;
    value: number;
  }[];
  title?: string;
}

const COLORS = ["#AEC6FF", "#88AAFF", "#6688FF", "#4D70FF", "#3355FF", "#ACABAA", "#8C8B8A"];

export default function CategoryDistribution({
  data,
  title = "Inventory by Category"
}: CategoryDistributionProps) {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-[0.2em]">
            {title}
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium italic">Protocol: Segment Distribution</p>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ 
                backgroundColor: "rgba(25, 26, 26, 0.8)", 
                backdropFilter: "blur(12px)",
                borderRadius: "2px", 
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "12px",
                fontSize: "11px",
                color: "#fcfcfa"
              }}
              formatter={(value: number | undefined) => value ? `$${value.toLocaleString()}` : "$0"}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="square" 
              formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
