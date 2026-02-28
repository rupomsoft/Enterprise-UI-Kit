import type { SidebarNavItem, SidebarNavLink } from "@/app/components/ui";

export const mainNavItems: SidebarNavItem[] = [
  { href: "/", label: "Introduction", icon: "Layers" },
  {
    label: "Components",
    icon: "Layers",
    children: [
      { href: "/button", label: "Button" },
      { href: "/badge", label: "Badge" },
      { href: "/calendar", label: "Calendar" },
      { href: "/card", label: "Card" },
      { href: "/carousel", label: "Carousel" },
      { href: "/form", label: "Form" },
      { href: "/alert", label: "Alert" },
      { href: "/avatar", label: "Avatar" },
      { href: "/breadcrumb", label: "Breadcrumb" },
      { href: "/progress-bar", label: "Progress Bar" },
      { href: "/tag", label: "Tag" },
      { href: "/tabs", label: "Tabs" },
      { href: "/table", label: "Table" },
      { href: "/empty-state", label: "Empty State" },
      { href: "/accordion", label: "Accordion" },
      { href: "/skeleton", label: "Skeleton" },
      { href: "/spinner", label: "Spinner" },
      { href: "/timeline", label: "Timeline" },
      { href: "/dropdown-menu", label: "Dropdown Menu" },
      { href: "/context-menu", label: "Context Menu" },
      { href: "/modal", label: "Modal" },
      { href: "/drawer", label: "Drawer" },
      { href: "/popover", label: "Popover" },
      { href: "/toast", label: "Toast" },
      { href: "/stepper", label: "Stepper" },
      { href: "/tooltip", label: "Tooltip" },
      { href: "/chart", label: "Chart" },
      { href: "/typography", label: "Typography" },
      { href: "/code-pad", label: "Code Pad" },
    ],
  },
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/pos", label: "POS", icon: "ShoppingCart" },
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

export const bottomNavItems: SidebarNavLink[] = [
  { href: "/learning", label: "Learning center", icon: "BookOpen" },
  { href: "/support", label: "Support", icon: "Headphones" },
];
