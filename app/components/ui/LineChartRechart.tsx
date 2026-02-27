"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface LineChartRechartProps {
  data: { name: string; value: number }[];
  dataKey?: string;
  xAxisKey?: string;
  height?: number;
  className?: string;
  strokeColor?: string;
}

const DEFAULT_STROKE = "rgb(17 24 39)"; // gray-900
const CHART_MARGIN = { top: 8, right: 8, left: 0, bottom: 0 };
const TOOLTIP_CONTENT_STYLE = { borderRadius: "8px", border: "1px solid var(--border)" };

export function LineChartRechart({
  data,
  dataKey = "value",
  xAxisKey = "name",
  height = 240,
  className = "",
  strokeColor = DEFAULT_STROKE,
}: LineChartRechartProps) {
  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-600" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            className="text-gray-500 dark:text-gray-400"
          />
          <YAxis tick={{ fontSize: 12 }} className="text-gray-500 dark:text-gray-400" />
          <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
