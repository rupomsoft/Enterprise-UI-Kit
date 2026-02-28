"use client";

import { ChevronDown } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export interface AccordionCardItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionCardProps {
  items: AccordionCardItem[];
  openId: string | null;
  onOpenChange: (id: string | null) => void;
  className?: string;
}

/** Card-style accordion: each item is a separate card with rounded corners and shadow. */
export function AccordionCard({
  items,
  openId,
  onOpenChange,
  className,
}: AccordionCardProps) {
  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      role="region"
      aria-label="Accordion"
    >
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
          >
            <button
              type="button"
              onClick={() => onOpenChange(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 min-h-[44px] text-left font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors touch-manipulation cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`accordion-card-content-${item.id}`}
              id={`accordion-card-trigger-${item.id}`}
            >
              <span className="text-base sm:text-lg">{item.title}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ease-out",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              id={`accordion-card-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-card-trigger-${item.id}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-4 pb-3 sm:px-5 sm:pb-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-normal">
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
