"use client";

import { cn } from "@/app/lib/utils";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface BarChartRechartProps {
  data: { name: string; value: number }[];
  dataKey?: string;
  xAxisKey?: string;
  height?: number;
  className?: string;
  barColor?: string;
}

const DEFAULT_COLOR = "rgb(17 24 39)"; // gray-900
const CHART_MARGIN = { top: 8, right: 8, left: 0, bottom: 0 };
const TOOLTIP_CONTENT_STYLE = { borderRadius: "8px", border: "1px solid var(--border)" };

export function BarChartRechart({
  data,
  dataKey = "value",
  xAxisKey = "name",
  height = 240,
  className,
  barColor = DEFAULT_COLOR,
}: BarChartRechartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-600" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            className="text-gray-500 dark:text-gray-400"
          />
          <YAxis tick={{ fontSize: 12 }} className="text-gray-500 dark:text-gray-400" />
          <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
          <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
