"use client";

import { useState, useMemo, type ReactNode } from "react";
import { Menu, Camera, ChevronDown, Sun, Moon, User, MoreVertical } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useTheme } from "@/app/context/ThemeContext";
import { IconButton } from "./IconButton";
import { Avatar } from "./Avatar";
import { DropdownMenu } from "./DropdownMenu";
import { inputBase } from "./styles";

export interface PosTopNavbarCategoryOption {
  value: string;
  label: string;
}

export interface PosTopNavbarProps {
  /** Brand/title text (e.g. "Enterprise UI") */
  title: string;
  /** Search input value */
  searchValue: string;
  /** Search input change handler */
  onSearchChange: (value: string) => void;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Category dropdown options */
  categoryOptions: PosTopNavbarCategoryOption[];
  /** Selected category value */
  categoryValue: string;
  /** Category change handler */
  onCategoryChange: (value: string) => void;
  /** Optional menu button click */
  onMenuClick?: () => void;
  /** Optional scan/barcode button click */
  onScanClick?: () => void;
  /** Show date in trailing area. Default true. */
  showDate?: boolean;
  /** Optional trailing content (replaces default avatar if provided) */
  trailing?: ReactNode;
  /** Called when Profile is chosen from the mobile 3-dot menu */
  onProfileClick?: () => void;
  className?: string;
}

function formatNavbarDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PosTopNavbar({
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search products...",
  categoryOptions,
  categoryValue,
  onCategoryChange,
  onMenuClick,
  onScanClick,
  showDate = true,
  trailing,
  onProfileClick,
  className,
}: PosTopNavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuItems = useMemo(
    () => [
      { label: "Light", onClick: () => setTheme("light") },
      { label: "Dark", onClick: () => setTheme("dark") },
      { label: "Profile", onClick: () => onProfileClick?.() },
    ],
    [setTheme, onProfileClick]
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-20 h-14 sm:h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center gap-2 sm:gap-4 px-3 sm:px-6 shrink-0 safe-area-top",
        className
      )}
    >
      {/* Menu + Title: hidden on mobile */}
      <div className="hidden sm:flex items-center gap-2 shrink-0">
        <IconButton
          icon={<Menu className="w-5 h-5" />}
          aria-label="Menu"
          onClick={onMenuClick}
          className="min-h-[36px] min-w-[36px] h-[36px] w-[36px]"
        />
        <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg truncate min-w-0 max-w-[140px] sm:max-w-none">
          {title}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center min-w-0 max-w-2xl mx-auto">
        <div className="flex w-full rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden min-h-[44px] sm:min-h-0">
          <input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(inputBase, "border-0 rounded-none pl-3 pr-2 min-w-0 flex-1 text-base sm:text-sm min-h-[44px] sm:min-h-0")}
            aria-label="Search products"
          />
          <button
            type="button"
            onClick={onScanClick}
            className="p-2.5 sm:p-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 shrink-0 touch-manipulation"
            aria-label="Scan barcode"
          >
            <Camera className="w-5 h-5" />
          </button>
          <div className="relative border-l border-gray-200 dark:border-gray-600 flex items-center min-h-[44px] sm:min-h-0">
            <select
              value={categoryValue}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="h-full min-h-[44px] sm:min-h-0 pl-3 pr-8 py-2 bg-transparent text-base sm:text-sm text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer appearance-none min-w-0 w-[72px] sm:w-auto"
              aria-label="Filter by category"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value || "all"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="w-4 h-4 text-gray-500 absolute right-2 pointer-events-none shrink-0"
              aria-hidden
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {/* Mobile: 3-dot menu with Light, Dark, Profile */}
        <div className="sm:hidden">
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            align="right"
            trigger={
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 touch-manipulation"
                aria-label="Open menu"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            }
            items={mobileMenuItems}
          />
        </div>
        {/* Desktop: date, theme, avatar */}
        {showDate && (
          <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
            {formatNavbarDate()}
          </span>
        )}
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="hidden sm:flex min-h-[36px] min-w-[36px] p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-colors touch-manipulation items-center justify-center"
          aria-label={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        {trailing != null ? (
          <span className="hidden sm:inline-flex">{trailing}</span>
        ) : (
          <span className="hidden sm:flex min-h-[36px] min-w-[36px] items-center justify-center">
            <Avatar
              size="md"
              bgClass="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
            >
              <User className="w-5 h-5" />
            </Avatar>
          </span>
        )}
      </div>
    </header>
  );
}
