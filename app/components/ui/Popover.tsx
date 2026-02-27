"use client";

import { type ReactNode } from "react";

export interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
}

export function Popover({ open, onOpenChange, trigger, children }: PopoverProps) {
  return (
    <div className="relative inline-block">
      <div onClick={() => onOpenChange(!open)}>{trigger}</div>
      {open && (
        <div className="absolute left-0 right-0 sm:right-auto top-full mt-2 z-[1100] w-full sm:w-56 min-w-[200px] rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}
