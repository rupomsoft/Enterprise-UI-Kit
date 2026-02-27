"use client";

import { useState } from "react";
import { Bell, Settings } from "lucide-react";
import { Sidebar, DashboardHeader } from "@/app/components/ui";
import type { SidebarNavItem, SidebarNavLink, SidebarLogo } from "@/app/components/ui";
import type { HeaderPrimaryAction, HeaderTrailingAction } from "@/app/components/ui/DashboardHeader";

const DEFAULT_USER = { name: "Michael Johnson", email: "m.johnson@finex.com", avatarInitials: "MJ" };

const DEFAULT_PRIMARY_ACTIONS: HeaderPrimaryAction[] | undefined = [
  { label: "Add widget", href: "/dashboard" },
  { label: "New", href: "/accounts" },
];

const DEFAULT_TRAILING_ACTIONS: HeaderTrailingAction[] = [
  { icon: Bell, ariaLabel: "Notifications", href: "/notifications" },
  { icon: Settings, ariaLabel: "Settings", href: "/settings" },
];

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const mainNavItems: SidebarNavItem[] = [
    { href: "/", label: "UI Kit", icon: "Layers" },
    { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/accounts", label: "Accounts", icon: "Users" },
    {
      label: "Transactions",
      icon: "ArrowLeftRight",
      children: [
        { href: "/transactions/history", label: "History", badge: 19 },
        { href: "/transactions/integration", label: "Integration" },
        { href: "/transactions/reports", label: "Reports" },
      ],
    },
    {
      label: "Table",
      icon: "Table2",
      children: [
        { href: "/table/simple", label: "Simple Tables" },
        { href: "/table/data-table", label: "Data Table" },
        { href: "/table/js-grid", label: "JS Grid" },
      ],
    },
    { href: "/cash-flow", label: "Cash flow", icon: "Wallet" },
    { href: "/budget", label: "Budget", icon: "PiggyBank" },
    { href: "/investments", label: "Investments", icon: "TrendingUp" },
  ];

  const bottomNavItems: SidebarNavLink[] = [
    { href: "/learning", label: "Learning center", icon: "BookOpen" },
    { href: "/support", label: "Support", icon: "Headphones" },
    
  ];

  const logo: SidebarLogo = { full: "Enterprise UI", short: "EU" };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] dark:bg-gray-950">
      <Sidebar
        mainNavItems={mainNavItems}
        bottomNavItems={bottomNavItems}
        logo={logo}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#F5F7FA] dark:bg-gray-900 overflow-hidden">
        <DashboardHeader
          user={DEFAULT_USER}
          primaryActions={DEFAULT_PRIMARY_ACTIONS ?? []}
          trailingActions={DEFAULT_TRAILING_ACTIONS}
          onSidebarToggle={() => setSidebarCollapsed((c) => !c)}
        />
        <main className="flex-1 min-h-0 overflow-auto p-4 sm:p-6 bg-[#F5F7FA] dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
