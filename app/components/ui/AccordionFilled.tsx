"use client";

import { Minus, Plus } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export interface AccordionFilledItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionFilledProps {
  items: AccordionFilledItem[];
  openId: string | null;
  onOpenChange: (id: string | null) => void;
  className?: string;
}

/** Filled accordion: each item has a light grey fill; plus when collapsed, minus when expanded. */
export function AccordionFilled({
  items,
  openId,
  onOpenChange,
  className,
}: AccordionFilledProps) {
  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      role="region"
      aria-label="Accordion"
    >
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-lg bg-gray-100 dark:bg-gray-700/50 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => onOpenChange(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 min-h-[44px] text-left font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-200/80 dark:hover:bg-gray-600/50 transition-colors touch-manipulation cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`accordion-filled-content-${item.id}`}
              id={`accordion-filled-trigger-${item.id}`}
            >
              <span className="text-base sm:text-lg">{item.title}</span>
              <span className="shrink-0 text-gray-600 dark:text-gray-400" aria-hidden>
                {isOpen ? (
                  <Minus className="w-5 h-5" strokeWidth={2.5} />
                ) : (
                  <Plus className="w-5 h-5" strokeWidth={2.5} />
                )}
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              id={`accordion-filled-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-filled-trigger-${item.id}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-4 pb-3 sm:px-5 sm:pb-4 pt-0 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-normal border-t-0 bg-gray-100 dark:bg-gray-700/50">
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
