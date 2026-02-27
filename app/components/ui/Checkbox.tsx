"use client";

import { type InputHTMLAttributes } from "react";

const inputClass =
  "w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 focus-visible:ring-offset-2 shrink-0 cursor-pointer";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({ label, className = "", id, ...props }: CheckboxProps) {
  const inputId = id ?? `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <label htmlFor={inputId} className="inline-flex items-center gap-3 cursor-pointer min-w-0">
      <input type="checkbox" id={inputId} className={`${inputClass} ${className}`.trim()} {...props} />
      <span className="text-sm text-gray-700 dark:text-gray-300 select-none">{label}</span>
    </label>
  );
}
