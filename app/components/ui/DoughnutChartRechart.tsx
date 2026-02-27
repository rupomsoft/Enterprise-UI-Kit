"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface DoughnutChartRechartProps {
  data: { name: string; value: number }[];
  dataKey?: string;
  nameKey?: string;
  height?: number;
  className?: string;
  colors?: string[];
  innerRadiusPercent?: number;
}

const DEFAULT_COLORS = [
  "rgb(17 24 39)",
  "rgb(107 114 128)",
  "rgb(34 197 94)",
  "rgb(234 179 8)",
  "rgb(239 68 68)",
];
const TOOLTIP_CONTENT_STYLE = { borderRadius: "8px", border: "1px solid var(--border)" };

export function DoughnutChartRechart({
  data,
  dataKey = "value",
  nameKey = "name",
  height = 240,
  className = "",
  colors = DEFAULT_COLORS,
  innerRadiusPercent = 60,
}: DoughnutChartRechartProps) {
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
            innerRadius={`${innerRadiusPercent}%`}
            outerRadius="80%"
            paddingAngle={1}
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
