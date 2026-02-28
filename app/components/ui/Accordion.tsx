"use client";

import { ChevronDown } from "lucide-react";
import { type ReactNode } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  openId: string | null;
  onOpenChange: (id: string | null) => void;
}

export function Accordion({ items, openId, onOpenChange }: AccordionProps) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700 first:divide-y-0">
      {items.map((item) => (
        <div key={item.id}>
          <button
            type="button"
            onClick={() => onOpenChange(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] sm:min-h-0 text-left text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors touch-manipulation cursor-pointer"
          >
            {item.title}
            <ChevronDown
              className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ease-out ${
                openId === item.id ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{ gridTemplateRows: openId === item.id ? "1fr" : "0fr" }}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="px-4 pb-3 text-sm text-gray-500 dark:text-gray-400">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
