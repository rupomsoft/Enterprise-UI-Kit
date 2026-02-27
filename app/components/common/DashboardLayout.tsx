"use client";

import { useState } from "react";
import { Bell, Settings } from "lucide-react";
import { Sidebar, DashboardHeader } from "@/app/components/ui";
import type { SidebarLogo } from "@/app/components/ui";
import type { HeaderPrimaryAction, HeaderTrailingAction } from "@/app/components/ui/DashboardHeader";
import { mainNavItems, bottomNavItems } from "@/app/config/sidebarNav";

const DEFAULT_USER = { name: "Michael Johnson", email: "m.johnson@finex.com", avatarInitials: "MJ" };

const DEFAULT_PRIMARY_ACTIONS: HeaderPrimaryAction[] | undefined = [
  { label: "Add widget", href: "/dashboard" },
  { label: "New", href: "/accounts" },
];

const DEFAULT_TRAILING_ACTIONS: HeaderTrailingAction[] = [
  { icon: Bell, ariaLabel: "Notifications", href: "/notifications" },
  { icon: Settings, ariaLabel: "Settings", href: "/settings" },
];

const LOGO: SidebarLogo = { full: "Enterprise UI", short: "EU" };

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] dark:bg-gray-950">
      <Sidebar
        mainNavItems={mainNavItems}
        bottomNavItems={bottomNavItems}
        logo={LOGO}
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
