"use client";

import { X } from "lucide-react";
import { type ReactNode } from "react";
import { cardClass } from "./styles";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Which side the drawer opens from. Default "right". */
  side?: DrawerSide;
}

const SIDE_CONTAINER_CLASS: Record<DrawerSide, string> = {
  left: "flex justify-start",
  right: "flex justify-end",
  top: "flex flex-col justify-start",
  bottom: "flex flex-col justify-end",
};

const SIDE_PANEL_CLASS: Record<DrawerSide, string> = {
  left:
    "w-full max-w-[100vw] sm:max-w-sm h-full max-h-[100dvh] rounded-r-[10px] rounded-l-none border-l border-r-0 border-t-0 border-b-0",
  right:
    "w-full max-w-[100vw] sm:max-w-sm h-full max-h-[100dvh] rounded-l-[10px] rounded-r-none border-r border-l-0 border-t-0 border-b-0",
  top:
    "w-full max-w-[100vw] h-auto max-h-[85dvh] rounded-b-[10px] rounded-t-none border-t border-r-0 border-l-0 border-b-0",
  bottom:
    "w-full max-w-[100vw] h-auto max-h-[85dvh] rounded-t-[10px] rounded-b-none border-b border-r-0 border-l-0 border-t-0",
};

export function Drawer({ open, onClose, title, children, side = "right" }: DrawerProps) {
  if (!open) return null;
  return (
    <div className={`fixed inset-0 z-50 safe-area-inset ${SIDE_CONTAINER_CLASS[side]}`}>
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`relative ${cardClass} overflow-y-auto ${SIDE_PANEL_CLASS[side]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate min-w-0">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 rounded-[6px] text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 shrink-0 touch-manipulation"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
