"use client";

import { type ReactNode } from "react";

export interface DropdownMenuItem {
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export interface DropdownMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  items: DropdownMenuItem[];
  /** When "right", menu opens to the left of the trigger (right-aligned). Default "left". */
  align?: "left" | "right";
}

export function DropdownMenu({ open, onOpenChange, trigger, items, align = "left" }: DropdownMenuProps) {
  const alignClass = align === "right" ? "right-0 left-auto" : "left-0 right-0 sm:right-auto";
  return (
    <div className="relative inline-block min-w-0">
      <div onClick={() => onOpenChange(!open)} className="min-w-0">{trigger}</div>
      {open && (
        <div className={`absolute ${alignClass} top-full mt-2 z-[1100] w-full sm:w-48 min-w-[200px] rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-1 overflow-hidden shadow-lg`}>
          {items.map((item, i) => (
            <button
              key={item.label ?? `item-${i}`}
              type="button"
              onClick={() => {
                item.onClick?.();
                onOpenChange(false);
              }}
              className={`w-full text-left px-4 py-3 sm:py-2 min-h-[44px] sm:min-h-0 flex items-center text-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-700 touch-manipulation ${
                item.variant === "danger"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
