"use client";

import { Button, type ButtonVariant } from "./Button";

export interface ButtonGroupOption {
  value: string;
  label: string;
}

const filledVariant: Record<ButtonVariant, "primary" | "secondary" | "danger"> = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  "primary-outline": "primary",
  "secondary-outline": "secondary",
  "danger-outline": "danger",
};

const outlineVariant: Record<ButtonVariant, "primary-outline" | "secondary-outline" | "danger-outline"> = {
  primary: "primary-outline",
  secondary: "secondary-outline",
  danger: "danger-outline",
  "primary-outline": "primary-outline",
  "secondary-outline": "secondary-outline",
  "danger-outline": "danger-outline",
};

export interface ButtonGroupProps {
  options: ButtonGroupOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: ButtonVariant;
  className?: string;
}

export function ButtonGroup({
  options,
  value,
  onChange,
  variant = "secondary",
  className = "",
}: ButtonGroupProps) {
  const selectedVariant = filledVariant[variant];
  const unselectedVariant = outlineVariant[variant];

  return (
    <div
      className={`inline-flex rounded-[8px] overflow-hidden border border-gray-200 dark:border-gray-600 ${className}`.trim()}
      role="group"
      aria-label="Button group"
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={value === opt.value ? selectedVariant : unselectedVariant}
          onClick={() => onChange(opt.value)}
          className="rounded-none border-0 min-w-0 -ml-px first:ml-0"
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
