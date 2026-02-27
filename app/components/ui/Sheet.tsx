"use client";

import { X } from "lucide-react";
import { type ReactNode } from "react";
import { cardClass } from "./styles";

export type SheetPosition = "bottom" | "left" | "right" | "top";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  position?: SheetPosition;
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
}

const positionClasses: Record<
  SheetPosition,
  { container: string; panel: string }
> = {
  bottom: {
    container: "flex flex-col justify-end items-stretch",
    panel:
      "w-full max-h-[85dvh] overflow-y-auto rounded-t-[10px] rounded-b-none border-t border-x-0 border-b-0",
  },
  top: {
    container: "flex flex-col justify-start items-stretch",
    panel:
      "w-full max-h-[85dvh] overflow-y-auto rounded-b-[10px] rounded-t-none border-b border-x-0 border-t-0",
  },
  left: {
    container: "flex flex-row justify-start items-stretch",
    panel:
      "h-full max-w-[100vw] sm:max-w-md overflow-y-auto rounded-r-[10px] rounded-l-none border-l border-y-0 border-r-0",
  },
  right: {
    container: "flex flex-row justify-end items-stretch",
    panel:
      "h-full max-w-[100vw] sm:max-w-md overflow-y-auto rounded-l-[10px] rounded-r-none border-r border-y-0 border-l-0",
  },
};

export function Sheet({
  open,
  onClose,
  title,
  position = "right",
  children,
  maxWidth,
  maxHeight,
}: SheetProps) {
  if (!open) return null;
  const { container, panel } = positionClasses[position];
  const style: React.CSSProperties = {};
  if (maxWidth) style.maxWidth = maxWidth;
  if (maxHeight) style.maxHeight = maxHeight;

  return (
    <div className="fixed inset-0 z-50 flex safe-area-inset">
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div className={`relative ${container} w-full h-full`}>
        <div
          className={`${cardClass} ${panel}`}
          style={style}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate min-w-0">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -m-2 rounded-[6px] text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 shrink-0 touch-manipulation min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
