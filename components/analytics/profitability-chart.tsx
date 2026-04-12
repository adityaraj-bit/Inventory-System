"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { motion } from "framer-motion";

interface ProfitabilityChartProps {
  data: {
    date: string;
    revenue: number;
    cost: number;
    profit: number;
  }[];
}

export default function ProfitabilityChart({ data }: ProfitabilityChartProps) {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-[0.2em]">
            Yield Analytics
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium italic">Protocol: Fiscal Telemetry</p>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#AEC6FF" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#AEC6FF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#acabaa" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#acabaa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#acabaa", fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#acabaa", fontSize: 10, fontWeight: 700 }}
              tickFormatter={(value) => `$${value}`}
            />
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
              itemStyle={{ fontWeight: "bold" }}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              height={36} 
              iconType="square" 
              formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#AEC6FF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Gross Revenue"
              animationBegin={0}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="#acabaa"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCost)"
              name="Operating Cost"
              animationBegin={200}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
