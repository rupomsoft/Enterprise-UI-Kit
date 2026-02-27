"use client";

import { type ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "./Card";

export interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon?: ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  trend,
  icon,
  className = "",
}: StatsCardProps) {
  const showTrend = trend != null || (change != null && change !== "");
  const isUp = trend === "up" || (change != null && change.startsWith("+"));
  const trendIcon = showTrend ? (isUp ? <TrendingUp className="w-4 h-4 shrink-0" /> : <TrendingDown className="w-4 h-4 shrink-0" />) : null;

  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {icon && <span className="text-gray-500 dark:text-gray-400 shrink-0">{icon}</span>}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1 tabular-nums">{value}</p>
          {showTrend && (change != null || trend != null) && (
            <div
              className={`inline-flex items-center gap-1 text-xs font-medium mt-1.5 ${
                isUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trendIcon}
              {change != null && change !== "" && <span>{change}</span>}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
