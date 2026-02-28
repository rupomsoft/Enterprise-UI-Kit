"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useCallback } from "react";
import { cn } from "@/app/lib/utils";

export interface HorizontalTimelineItem {
  id: string;
  /** Small label above the title (e.g. "Start", "Discovery"). */
  tag?: string;
  title: string;
  description?: string;
  time: string;
}

export interface HorizontalTimelineProps {
  items: HorizontalTimelineItem[];
  /** Optional title shown at the start of the timeline (e.g. "Timeline"). */
  title?: string;
  className?: string;
}

const ITEM_MIN_WIDTH = 180;
const SCROLL_OFFSET = 280;

export function HorizontalTimeline({
  items,
  title,
  className,
}: HorizontalTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = direction === "left" ? -SCROLL_OFFSET : SCROLL_OFFSET;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between gap-4 mb-4">
        {title != null && (
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        )}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors touch-manipulation"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors touch-manipulation"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden pb-2 -mx-1 scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex min-w-max gap-0">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="flex shrink-0 flex-col"
              style={{ minWidth: ITEM_MIN_WIDTH }}
            >
              {/* Content above the line */}
              <div className="px-2 pb-3">
                {item.tag != null && (
                  <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                    {item.tag}
                  </span>
                )}
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </p>
                {item.description != null && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Track: circle + line segment to the right */}
              <div className="flex items-center flex-1 min-h-[32px]">
                <div
                  className="w-3 h-3 rounded-full border-2 border-gray-900 dark:border-gray-100 bg-white dark:bg-gray-800 shrink-0"
                  aria-hidden
                />
                {i < items.length - 1 && (
                  <div
                    className="h-px flex-1 min-w-[40px] bg-gray-200 dark:bg-gray-600 shrink-0"
                    aria-hidden
                  />
                )}
              </div>

              {/* Time below the marker */}
              <p className="text-xs text-gray-500 dark:text-gray-400 pt-1 px-2">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
