"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Layers } from "lucide-react";
import { SIDEBAR_ICON_MAP } from "./sidebarIcons";

export type IconComponent = React.ComponentType<{ className?: string }>;

/** Icon can be a Lucide icon name (string) for JSON config, or a component */
export type SidebarIcon = string | IconComponent;

function resolveIcon(icon: SidebarIcon): IconComponent {
  if (typeof icon === "function" || typeof icon === "object") return icon as IconComponent;
  return SIDEBAR_ICON_MAP[icon] ?? Layers;
}

/** Single nav link (no children). Use icon as string in JSON for mainNavItems. */
export interface SidebarNavLink {
  href: string;
  label: string;
  icon: SidebarIcon;
}

/** Nav item with expandable children. Use icon as string in JSON. */
export interface SidebarNavGroup {
  label: string;
  icon: SidebarIcon;
  children: Array<{ href: string; label: string; badge?: number }>;
}

export type SidebarNavItem = SidebarNavLink | SidebarNavGroup;

export function isSidebarNavGroup(
  item: SidebarNavItem
): item is SidebarNavGroup {
  return "children" in item && Array.isArray(item.children);
}

export interface SidebarLogo {
  /** Shown when sidebar is expanded */
  full: string;
  /** Shown when sidebar is collapsed (e.g. initials) */
  short: string;
}

export interface SidebarProps {
  mainNavItems: SidebarNavItem[];
  bottomNavItems?: SidebarNavLink[];
  logo: SidebarLogo;
  collapseLabel?: string;
  collapsed: boolean;
  onCollapse: () => void;
}

export function Sidebar({
  mainNavItems,
  bottomNavItems = [],
  logo,
  collapseLabel = "Collapse sidebar",
  collapsed,
  onCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`sticky top-0 left-0 h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 shrink-0 min-w-0 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-gray-100 dark:border-gray-800 shrink-0">
        {!collapsed && (
          <span className="font-bold text-lg tracking-tight text-[#1A1A1A] dark:text-gray-100">
            {logo.full}
          </span>
        )}
        {collapsed && (
          <span className="font-bold text-sm text-[#1A1A1A] dark:text-gray-100 mx-auto">
            {logo.short}
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          {mainNavItems.map((item) => {
            if (isSidebarNavGroup(item)) {
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenus((prev) => ({
                        ...prev,
                        [item.label]: !prev[item.label],
                      }))
                    }
                    className="w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-[8px] text-[#1A1A1A] dark:text-gray-200 hover:bg-[#F0F0F0] dark:hover:bg-gray-800 transition-colors text-left cursor-pointer"
                  >
                    {(() => {
                      const Icon = resolveIcon(item.icon);
                      return <Icon className="w-5 h-5 shrink-0 text-[#1A1A1A] dark:text-gray-200" />;
                    })()}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium">
                          {item.label}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-[#1A1A1A] dark:text-gray-200 transition-transform duration-[250ms] ease-out ${
                            openMenus[item.label] ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>
                  {!collapsed && item.children && (
                    <div
                      className="grid transition-[grid-template-rows] duration-[250ms] ease-out"
                      style={{
                        gridTemplateRows: openMenus[item.label] ? "1fr" : "0fr",
                      }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="ml-5 mt-0.5 space-y-0.5 border-l border-gray-200 dark:border-gray-700 pl-3 py-1">
                          {item.children.map((child) => {
                            const childActive = isActive(child.href);
                            return (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className={`flex items-center gap-2 px-2 py-2 rounded-[8px] text-sm font-medium ${
                                    childActive
                                      ? "bg-[#F0F0F0] dark:bg-gray-800 text-[#1A1A1A] dark:text-gray-100 font-semibold"
                                      : "text-[#1A1A1A] dark:text-gray-200 hover:bg-[#F0F0F0] dark:hover:bg-gray-800"
                                  }`}
                                >
                                  <span>{child.label}</span>
                                  {child.badge !== undefined && (
                                    <span className="ml-auto bg-[#1A1A1A] dark:bg-gray-200 text-white dark:text-gray-900 text-xs font-medium min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center">
                                      {child.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            }
            const active = isActive(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-[8px] transition-colors ${
                    active
                      ? "bg-[#F0F0F0] dark:bg-gray-800 text-[#1A1A1A] dark:text-gray-100 font-semibold pl-4"
                      : "text-[#1A1A1A] dark:text-gray-200 hover:bg-[#F0F0F0] dark:hover:bg-gray-800"
                  }`}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-1/2 bg-black dark:bg-white rounded-[8px]"
                      aria-hidden
                    />
                  )}
                  {(() => {
                    const Icon = resolveIcon(item.icon);
                    return (
                      <Icon
                        className={`w-5 h-5 shrink-0 ${active ? "text-[#1A1A1A] dark:text-gray-100" : "text-[#1A1A1A] dark:text-gray-200"}`}
                      />
                    );
                  })()}
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {!collapsed && bottomNavItems.length > 0 && (
          <div className="my-3 border-t border-gray-200 dark:border-gray-700" role="separator" />
        )}

        <ul className="space-y-0.5">
          {bottomNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-[8px] transition-colors ${
                    active
                      ? "bg-[#F0F0F0] dark:bg-gray-800 text-[#1A1A1A] dark:text-gray-100 font-semibold pl-4"
                      : "text-[#1A1A1A] dark:text-gray-200 hover:bg-[#F0F0F0] dark:hover:bg-gray-800"
                  }`}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-1/2 bg-black dark:bg-white rounded-[8px]"
                      aria-hidden
                    />
                  )}
                  {(() => {
                    const Icon = resolveIcon(item.icon);
                    return <Icon className="w-5 h-5 shrink-0 text-[#1A1A1A] dark:text-gray-200" />;
                  })()}
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
