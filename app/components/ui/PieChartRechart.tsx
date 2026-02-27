"use client";

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export interface PieChartRechartProps {
  data: { name: string; value: number }[];
  dataKey?: string;
  nameKey?: string;
  height?: number;
  className?: string;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "rgb(17 24 39)",   // gray-900
  "rgb(107 114 128)", // gray-500
  "rgb(34 197 94)",  // emerald-500
  "rgb(234 179 8)",  // amber-500
  "rgb(239 68 68)",  // red-500
];
const TOOLTIP_CONTENT_STYLE = { borderRadius: "8px", border: "1px solid var(--border)" };

export function PieChartRechart({
  data,
  dataKey = "value",
  nameKey = "name",
  height = 240,
  className = "",
  colors = DEFAULT_COLORS,
}: PieChartRechartProps) {
  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
