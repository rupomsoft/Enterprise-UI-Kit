"use client";

import { Check, Clock, Lightbulb, type LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

export type CardTimelineItemState = "completed" | "active" | "pending";

export interface CardTimelineItem {
  id: string;
  title: string;
  time: string;
  description?: string;
  /** "In progress", "Done", etc. Shown for active items below description. */
  statusLabel?: string;
  state: CardTimelineItemState;
  /** Optional icon override for the node. Defaults: Check (completed), Lightbulb (active), Clock (pending). */
  icon?: LucideIcon;
}

export interface CardTimelineProps {
  items: CardTimelineItem[];
  className?: string;
}

const defaultIcon: Record<CardTimelineItemState, LucideIcon> = {
  completed: Check,
  active: Lightbulb,
  pending: Clock,
};

export function CardTimeline({ items, className }: CardTimelineProps) {
  return (
    <div className={cn("flex flex-col", className)} role="list">
      {items.map((item, i) => {
        const Icon = item.icon ?? defaultIcon[item.state];
        const isLast = i === items.length - 1;
        const isActive = item.state === "active";
        const isCompleted = item.state === "completed";
        const isPending = item.state === "pending";

        return (
          <div
            key={item.id}
            className="flex gap-4"
            role="listitem"
          >
            {/* Track: line + node */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                  isCompleted &&
                    "bg-gray-900 dark:bg-gray-100 border-gray-900 dark:border-gray-100 text-white dark:text-gray-900",
                  isActive &&
                    "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500 text-white",
                  isPending &&
                    "bg-transparent border-gray-300 dark:border-gray-500 text-gray-500 dark:text-gray-400"
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={2.5} aria-hidden />
              </div>
              {!isLast && (
                <div
                  className="w-px flex-1 min-h-[24px] mt-1 bg-gray-200 dark:bg-gray-600"
                  aria-hidden
                />
              )}
            </div>

            {/* Card */}
            <div
              className={cn(
                "flex-1 min-w-0 rounded-lg border pb-4 mb-1",
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
              )}
            >
              <div className="px-4 pt-3 sm:px-5 sm:pt-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <span className="flex items-center gap-1.5 shrink-0 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3.5 h-3.5" aria-hidden />
                    {item.time}
                  </span>
                </div>
                {item.description != null && (
                  <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                )}
                {isActive && item.statusLabel != null && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                      aria-hidden
                    />
                    {item.statusLabel}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
