import { cn } from "@/app/lib/utils";
import { type ReactNode } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "caption"
  | "label";

const variantClass: Record<TypographyVariant, string> = {
  h1: "text-3xl font-bold text-gray-900 dark:text-gray-100",
  h2: "text-2xl font-semibold text-gray-900 dark:text-gray-100",
  h3: "text-xl font-semibold text-gray-900 dark:text-gray-100",
  h4: "text-base font-semibold text-gray-900 dark:text-gray-100",
  body1: "text-base text-gray-700 dark:text-gray-300",
  body2: "text-sm text-gray-600 dark:text-gray-400",
  caption: "text-xs text-gray-500 dark:text-gray-400",
  label: "text-sm font-medium text-gray-700 dark:text-gray-300",
};

export interface TypographyProps {
  variant?: TypographyVariant;
  component?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  children: ReactNode;
  className?: string;
}

export function Typography({
  variant = "body1",
  component,
  children,
  className,
}: TypographyProps) {
  const Comp =
    component ??
    (variant.startsWith("h")
      ? (variant as "h1" | "h2" | "h3" | "h4")
      : "p");
  return (
    <Comp className={cn(variantClass[variant], className)}>
      {children}
    </Comp>
  );
}
