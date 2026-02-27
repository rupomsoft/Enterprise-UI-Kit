"use client";

import { cn } from "@/app/lib/utils";
import { hintClass } from "./styles";

export interface TimelineItem {
  time: string;
  title: string;
  desc?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-gray-900 dark:bg-gray-100 shrink-0" />
            {i < items.length - 1 && (
              <div className="w-px flex-1 min-h-[24px] bg-gray-200 dark:bg-gray-600 mt-1" />
            )}
          </div>
          <div className="pb-4">
            <p className={hintClass}>{item.time}</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
            {item.desc != null && (
              <p className={cn(hintClass, "mt-0.5")}>{item.desc}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
