"use client";

import { ChevronDown } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export interface AccordionNumberedItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionNumberedProps {
  items: AccordionNumberedItem[];
  openId: string | null;
  onOpenChange: (id: string | null) => void;
  className?: string;
}

function formatNumber(index: number, total: number): string {
  const digits = String(total).length;
  return String(index + 1).padStart(Math.min(digits, 2), "0");
}

/** Numbered accordion: each item has a circular number badge; active badge is filled, inactive outlined. */
export function AccordionNumbered({
  items,
  openId,
  onOpenChange,
  className,
}: AccordionNumberedProps) {
  return (
    <div
      className={cn(
        "divide-y divide-gray-200 dark:divide-gray-600 first:divide-y-0",
        className
      )}
      role="region"
      aria-label="Accordion"
    >
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const number = formatNumber(index, items.length);
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => onOpenChange(isOpen ? null : item.id)}
              className="w-full flex items-center gap-3 py-3 min-h-[44px] text-left touch-manipulation cursor-pointer group"
              aria-expanded={isOpen}
              aria-controls={`accordion-numbered-content-${item.id}`}
              id={`accordion-numbered-trigger-${item.id}`}
            >
              <span
                className={cn(
                  "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  isOpen
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "border-2 border-gray-300 dark:border-gray-500 bg-transparent text-gray-500 dark:text-gray-400"
                )}
                aria-hidden
              >
                {number}
              </span>
              <span
                className={cn(
                  "flex-1 min-w-0 transition-colors",
                  isOpen
                    ? "font-semibold text-gray-900 dark:text-gray-100"
                    : "font-normal text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                )}
              >
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200 ease-out",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              id={`accordion-numbered-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-numbered-trigger-${item.id}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pl-11 pr-0 pb-3 text-sm text-gray-600 dark:text-gray-400">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
