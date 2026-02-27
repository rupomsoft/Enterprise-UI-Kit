"use client";

import Link from "next/link";
import { PanelLeft, Plus, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

export type HeaderTrailingAction = {
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
  href?: string;
  onClick?: () => void;
};

export type HeaderPrimaryAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export interface DashboardHeaderProps {
  user?: { name: string; email: string; avatarInitials: string } | null;
  primaryActions?: HeaderPrimaryAction[];
  trailingActions?: HeaderTrailingAction[];
  onSidebarToggle?: () => void;
}

export function DashboardHeader({
  user = null,
  primaryActions = [],
  trailingActions = [],
  onSidebarToggle,
}: DashboardHeaderProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (_) {}
    toggleTheme();
  };

  return (
    <header className="sticky top-0 z-10 h-14 sm:h-16 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-2">
        {onSidebarToggle && (
          <IconButton
            icon={<PanelLeft className="w-5 h-5" />}
            aria-label="Toggle sidebar"
            onClick={onSidebarToggle}
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleThemeToggle}
          className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
        >
          {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {trailingActions.map((action, i) =>
          action.href ? (
            <Link
              key={i}
              href={action.href}
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-[8px] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors inline-flex items-center justify-center shrink-0"
              aria-label={action.ariaLabel}
            >
              <action.icon className="w-5 h-5" />
            </Link>
          ) : (
            <IconButton
              key={i}
              icon={<action.icon className="w-5 h-5" />}
              aria-label={action.ariaLabel}
              onClick={action.onClick}
            />
          )
        )}
        {user && (
          <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-700">
            <div className="w-9 h-9 rounded-full bg-emerald-500 dark:bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
              {user.avatarInitials}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        )}
        {primaryActions.map((action, i) =>
          action.href ? (
            <Link
              key={i}
              href={action.href}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] px-4 py-2 min-h-[44px] sm:min-h-0 text-sm font-medium transition-colors border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{action.label}</span>
            </Link>
          ) : (
            <Button
              key={i}
              variant="secondary"
              onClick={action.onClick}
              className="gap-2"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          )
        )}
      </div>
    </header>
  );
}
