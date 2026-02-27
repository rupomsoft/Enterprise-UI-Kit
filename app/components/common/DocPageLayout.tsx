"use client";

import { DashboardLayout } from "@/app/components/common/DashboardLayout";

const PAGE_CONTAINER_CLASS = "w-full min-w-0 mx-auto px-4 sm:px-6 space-y-10";

const MAX_WIDTH = {
  content: "max-w-7xl",
  narrow: "max-w-4xl",
  code: "max-w-2xl",
} as const;

export type DocPageMaxWidth = keyof typeof MAX_WIDTH;

export interface DocPageLayoutProps {
  children: React.ReactNode;
  /** Default "content" (max-w-7xl). Use "narrow" for intro/reading pages. */
  maxWidth?: DocPageMaxWidth;
}

export function DocPageLayout({ children, maxWidth = "content" }: DocPageLayoutProps) {
  return (
    <DashboardLayout>
      <div className={`${PAGE_CONTAINER_CLASS} ${MAX_WIDTH[maxWidth]}`}>{children}</div>
    </DashboardLayout>
  );
}
