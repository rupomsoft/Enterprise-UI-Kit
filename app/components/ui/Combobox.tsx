"use client";

import { ChevronDown } from "lucide-react";
import { inputBase } from "./styles";

export interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  open: boolean;
  options: string[];
  placeholder?: string;
  label?: string;
}

export function Combobox({
  value,
  onChange,
  onOpenChange,
  open,
  options,
  placeholder = "Type or choose...",
  label,
}: ComboboxProps) {
  return (
    <div className="space-y-1.5">
      {label != null && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onOpenChange?.(true)}
          onBlur={() => setTimeout(() => onOpenChange?.(false), 150)}
          placeholder={placeholder}
          className={inputBase + " pr-9"}
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-1 shadow-lg max-h-[min(50vh,240px)] overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                className="w-full text-left px-3 py-3 sm:py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation cursor-pointer"
                onMouseDown={() => onChange(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
