"use client";

import { type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  /** Optional icon (e.g. for card variant) */
  icon?: ReactNode;
}

export type TabsVariant = "underline" | "pill" | "card" | "rounded";

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onTabChange: (id: string) => void;
  /** Visual style: underline (default), pill, card, rounded */
  variant?: TabsVariant;
  className?: string;
}

export function Tabs({
  tabs,
  activeId,
  onTabChange,
  variant = "underline",
  className = "",
}: TabsProps) {
  const activeTab = tabs.find((t) => t.id === activeId);

  const baseInactive =
    "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300";
  const baseActiveFill =
    "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900";

  return (
    <div className={`min-w-0 ${className}`.trim()}>
      <div
        className={
          variant === "card"
            ? "flex gap-1 p-1 rounded-[10px] bg-gray-100 dark:bg-gray-700/50 overflow-x-auto overflow-y-hidden"
            : variant === "underline"
              ? "flex gap-1 border-b border-gray-200 dark:border-gray-600 pb-0 -mb-px overflow-x-auto overflow-y-hidden -mx-px"
              : "flex gap-1 overflow-x-auto overflow-y-hidden -mx-px"
        }
      >
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          if (variant === "underline") {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-3 sm:px-4 py-2.5 min-h-[44px] sm:min-h-0 text-sm font-medium rounded-t-[8px] border-b-2 -mb-px transition-colors whitespace-nowrap shrink-0 touch-manipulation cursor-pointer ${
                  isActive
                    ? "border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 bg-transparent"
                    : `border-transparent ${baseInactive}`
                }`}
              >
                {tab.label}
              </button>
            );
          }
          if (variant === "pill") {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? baseActiveFill
                    : baseInactive
                }`}
              >
                {tab.label}
              </button>
            );
          }
          if (variant === "rounded") {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-[8px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? baseActiveFill
                    : baseInactive
                }`}
              >
                {tab.label}
              </button>
            );
          }
          if (variant === "card") {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-[8px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                    : baseInactive
                }`}
              >
                {tab.icon != null && (
                  <span
                    className={`shrink-0 [&>svg]:w-4 [&>svg]:h-4 ${
                      isActive
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {tab.icon}
                  </span>
                )}
                {tab.label}
              </button>
            );
          }
          return null;
        })}
      </div>
      {activeTab != null && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 min-w-0">
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
