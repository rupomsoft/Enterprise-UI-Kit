"use client";

import { cn } from "@/app/lib/utils";
import { useId } from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface AreaChartRechartProps {
  data: { name: string; value: number }[];
  dataKey?: string;
  xAxisKey?: string;
  height?: number;
  className?: string;
  /** Fill color for the area (default: gray-900) */
  fillColor?: string;
  /** Stroke color for the area line (default: same as fillColor) */
  strokeColor?: string;
  /** Opacity of the fill (0–1). Default 0.4 */
  fillOpacity?: number;
}

const DEFAULT_COLOR = "rgb(17 24 39)"; // gray-900
const CHART_MARGIN = { top: 8, right: 8, left: 0, bottom: 0 };
const TOOLTIP_CONTENT_STYLE = { borderRadius: "8px", border: "1px solid var(--border)" };

export function AreaChartRechart({
  data,
  dataKey = "value",
  xAxisKey = "name",
  height = 240,
  className,
  fillColor = DEFAULT_COLOR,
  strokeColor,
  fillOpacity = 0.4,
}: AreaChartRechartProps) {
  const stroke = strokeColor ?? fillColor;
  const gradientId = useId().replace(/:/g, "-");

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={CHART_MARGIN}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillColor} stopOpacity={fillOpacity} />
              <stop offset="100%" stopColor={fillColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-600" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            className="text-gray-500 dark:text-gray-400"
          />
          <YAxis tick={{ fontSize: 12 }} className="text-gray-500 dark:text-gray-400" />
          <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
