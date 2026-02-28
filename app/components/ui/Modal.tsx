"use client";

import { cn } from "@/app/lib/utils";
import { X } from "lucide-react";
import { type ReactNode, useMemo, useState, useEffect, useLayoutEffect, useRef } from "react";
import { cardClass } from "./styles";
import { Button } from "./Button";

const ANIM_DURATION_MS = 200;

export type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full-screen";

const modalSizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  "full-screen":
    "w-full h-full max-w-none max-h-none sm:w-[100vw] sm:h-[100dvh] sm:max-w-none sm:max-h-none rounded-none",
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Modal width/size. Default "md". */
  size?: ModalSize;
}

function ModalDefaultFooter({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
      <Button
        variant="secondary"
        onClick={onClose}
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>
      <Button onClick={onClose} className="w-full sm:w-auto">
        Confirm
      </Button>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  const [exiting, setExiting] = useState(false);
  const [exitingVisible, setExitingVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (open) {
      setExiting(false);
      setExitingVisible(false);
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useLayoutEffect(() => {
    if (prevOpenRef.current && !open) {
      setExiting(true);
      setExitingVisible(true);
    }
    prevOpenRef.current = open;
  }, [open]);

  useLayoutEffect(() => {
    if (!exiting) return;
    const raf = requestAnimationFrame(() => setExitingVisible(false));
    return () => cancelAnimationFrame(raf);
  }, [exiting]);

  useEffect(() => {
    if (!exiting) return;
    const id = setTimeout(() => {
      setExiting(false);
      setMounted(false);
    }, ANIM_DURATION_MS);
    return () => clearTimeout(id);
  }, [exiting]);

  const defaultFooter = useMemo(
    () => <ModalDefaultFooter onClose={onClose} />,
    [onClose]
  );
  const isFullScreen = size === "full-screen";
  const visible = open || exiting;
  const showFull = (open && mounted && !exiting) || (exiting && exitingVisible);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end sm:items-center justify-center safe-area-inset",
        isFullScreen ? "p-0" : "p-0 sm:p-4"
      )}
      role="dialog"
      aria-modal
      aria-labelledby="modal-title"
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/50 dark:bg-black/60 transition-opacity duration-200 ease-out",
          showFull ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          "relative w-full overflow-y-auto min-w-0 transition-[transform,opacity] duration-200 ease-out",
          cardClass,
          modalSizeClasses[size],
          isFullScreen
            ? "max-h-[90vh] sm:max-h-none rounded-t-[10px] sm:rounded-none"
            : "max-h-[90vh] sm:max-h-none sm:rounded-[10px] rounded-t-[10px] mx-auto",
          showFull ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 mb-4 sticky top-0 bg-white dark:bg-gray-800 -mt-4 pt-4 sm:static sm:bg-transparent sm:dark:bg-transparent sm:-mt-0 sm:pt-0">
          <h3
            id="modal-title"
            className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate min-w-0"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 min-h-[44px] min-w-[44px] rounded-[6px] text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 shrink-0 touch-manipulation inline-flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 min-w-0">
          {children}
        </div>
        {footer != null ? footer : defaultFooter}
      </div>
    </div>
  );
}
