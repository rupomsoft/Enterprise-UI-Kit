"use client";

import { ChevronDown } from "lucide-react";
import { type SelectHTMLAttributes } from "react";
import { labelBase, inputBase } from "./styles";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  options,
  placeholder = "Select...",
  className = "",
  id,
  ...props
}: SelectProps) {
  const inputId = id ?? (label ? `select-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  return (
    <div className="space-y-1.5 min-w-0">
      {label && inputId && (
        <label htmlFor={inputId} className={labelBase}>
          {label}
        </label>
      )}
      <div className="relative min-w-0">
        <select
          id={inputId}
          className={`${inputBase} pr-9 appearance-none cursor-pointer min-w-0 ${className}`.trim()}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none shrink-0" aria-hidden />
      </div>
    </div>
  );
}
