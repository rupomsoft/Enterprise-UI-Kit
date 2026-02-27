"use client";

import { cn } from "@/app/lib/utils";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface ContextMenuItem {
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  /** When true, item is disabled and not clickable */
  disabled?: boolean;
}

export interface ContextMenuProps {
  /** Content that triggers the context menu on right-click */
  children: ReactNode;
  /** Menu items shown on right-click */
  items: ContextMenuItem[];
  /** Called when menu open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Controlled open state (optional). When uncontrolled, internal state is used. */
  open?: boolean;
  /** Optional className for the trigger wrapper */
  className?: string;
}

export function ContextMenu({
  children,
  items,
  onOpenChange,
  open: controlledOpen,
  className,
}: ContextMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      positionRef.current = { x: e.clientX, y: e.clientY };
      setOpen(true);
    },
    [setOpen]
  );

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleScroll = () => setOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, setOpen]);

  // Keep menu in viewport; reset position when closed
  const [menuStyle, setMenuStyle] = useState<{ left: number; top: number } | null>(null);
  useEffect(() => {
    if (!open) {
      setMenuStyle(null);
      return;
    }
    const { x, y } = positionRef.current;
    const padding = 8;
    const id = requestAnimationFrame(() => {
      if (!menuRef.current) return;
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let left = x;
      let top = y;
      if (left + rect.width + padding > vw) left = vw - rect.width - padding;
      if (left < padding) left = padding;
      if (top + rect.height + padding > vh) top = vh - rect.height - padding;
      if (top < padding) top = padding;
      setMenuStyle({ left, top });
    });
    return () => cancelAnimationFrame(id);
  }, [open, items.length]);

  return (
    <>
      <div
        className={cn("min-w-0", className)}
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>
      {open && (
        <div
          ref={menuRef}
          className="fixed z-[1200] min-w-[160px] w-max max-w-[min(280px,90vw)] rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-1 shadow-lg overflow-hidden"
          style={
            menuStyle
              ? { left: menuStyle.left, top: menuStyle.top }
              : { left: positionRef.current.x, top: positionRef.current.y, visibility: "hidden" as const }
          }
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, i) => (
            <button
              key={item.label ?? `item-${i}`}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                item.onClick?.();
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2.5 min-h-[36px] flex items-center text-sm transition-colors touch-manipulation",
                "hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-gray-700",
                item.disabled && "opacity-50 pointer-events-none cursor-not-allowed",
                item.variant === "danger"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-900 dark:text-gray-100"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
