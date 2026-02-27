"use client";

import { cn } from "@/app/lib/utils";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { X } from "lucide-react";
import { hintClass } from "./styles";

export type ToastPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-center"
  | "top-right";

const GAP = 16; // 1rem

const TOAST_POSITION_STYLES: Record<ToastPosition, CSSProperties> = {
  "bottom-center": {
    bottom: `calc(${GAP}px + env(safe-area-inset-bottom, 0px))`,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "bottom-left": {
    bottom: `calc(${GAP}px + env(safe-area-inset-bottom, 0px))`,
    left: `calc(${GAP}px + env(safe-area-inset-left, 0px))`,
  },
  "bottom-right": {
    bottom: `calc(${GAP}px + env(safe-area-inset-bottom, 0px))`,
    right: `calc(${GAP}px + env(safe-area-inset-right, 0px))`,
  },
  "top-left": {
    top: `calc(${GAP}px + env(safe-area-inset-top, 0px))`,
    left: `calc(${GAP}px + env(safe-area-inset-left, 0px))`,
  },
  "top-center": {
    top: `calc(${GAP}px + env(safe-area-inset-top, 0px))`,
    left: "50%",
    transform: "translateX(-50%)",
  },
  "top-right": {
    top: `calc(${GAP}px + env(safe-area-inset-top, 0px))`,
    right: `calc(${GAP}px + env(safe-area-inset-right, 0px))`,
  },
};

export interface ToastProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Placement of the toast. Default "bottom-right". */
  position?: ToastPosition;
  /** Optional icon shown on the left of the toast. */
  icon?: ReactNode;
  /** Vertical alignment of the icon: "start" (align with title) or "center" (center with content block). Default "start". */
  iconPosition?: "start" | "center";
  /** Optional Tailwind classes for the icon wrapper (e.g. padding "p-2", size). Default adds minimal spacing. */
  iconClassName?: string;
  /** Auto-dismiss after this many ms. Default 3000. Set to 0 to disable. */
  autoDismissMs?: number;
}

const DEFAULT_AUTO_DISMISS_MS = 3000;

export function Toast({
  open,
  onClose,
  title,
  description,
  position = "bottom-right",
  icon,
  iconPosition = "start",
  iconClassName,
  autoDismissMs = DEFAULT_AUTO_DISMISS_MS,
}: ToastProps) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (!open || autoDismissMs <= 0) return;
    const id = window.setTimeout(() => onCloseRef.current(), autoDismissMs);
    return () => window.clearTimeout(id);
  }, [open, autoDismissMs]);

  if (!open) return null;
  const iconWrapperClass =
    iconClassName ?? (iconPosition === "center" ? "shrink-0 self-center" : "shrink-0 pt-0.5");
  const positionStyle = TOAST_POSITION_STYLES[position];
  return (
    <div
      className="fixed z-50 flex flex-row items-start w-full max-w-[calc(100vw-2rem)] sm:max-w-sm rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 shadow-lg gap-3"
      style={positionStyle}
    >
      {icon != null && <div className={iconWrapperClass}>{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{title}</p>
        {description != null && (
          <p className={cn(hintClass, "line-clamp-2")}>{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="p-2 -m-2 shrink-0 rounded-[6px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 touch-manipulation"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
