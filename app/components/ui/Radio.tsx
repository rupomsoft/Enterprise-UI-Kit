"use client";

import { type InputHTMLAttributes } from "react";

const inputClass =
  "w-4 h-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 focus-visible:ring-offset-2 shrink-0 cursor-pointer";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

export function Radio({ name, options, value, onChange, ...props }: RadioProps) {
  return (
    <div className="space-y-3 min-w-0" role="radiogroup">
      {options.map((opt) => {
        const optId = `radio-${name}-${opt.value}`;
        return (
          <label key={opt.value} htmlFor={optId} className="inline-flex items-center gap-3 cursor-pointer min-w-0">
            <input
              type="radio"
              id={optId}
              name={name}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className={inputClass}
              {...props}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 select-none">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
