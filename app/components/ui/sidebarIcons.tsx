"use client";

import {
  LayoutDashboard,
  Layers,
  Users,
  ArrowLeftRight,
  ChevronDown,
  Wallet,
  PiggyBank,
  TrendingUp,
  BookOpen,
  Headphones,
  PanelLeftClose,
  Table2,
  Home,
  FileText,
  Settings,
  BarChart2,
  CreditCard,
  PieChart,
  Mail,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

/** Map of icon name (string) to Lucide icon component for JSON-driven sidebar nav */
export const SIDEBAR_ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Layers,
  Users,
  ArrowLeftRight,
  Wallet,
  PiggyBank,
  TrendingUp,
  BookOpen,
  Headphones,
  Table2,
  Home,
  FileText,
  Settings,
  BarChart2,
  CreditCard,
  PieChart,
  Mail,
  HelpCircle,
};

export type SidebarIconName = keyof typeof SIDEBAR_ICON_MAP;
