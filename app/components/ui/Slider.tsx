"use client";

import { type InputHTMLAttributes } from "react";
import { labelBase } from "./styles";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function Slider({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  id,
  ...props
}: SliderProps) {
  const inputId = id ?? (label ? `slider-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
  return (
    <div className="space-y-1.5 min-w-0">
      {label && inputId && (
        <label htmlFor={inputId} className={labelBase}>
          {label}: {value}
        </label>
      )}
      <input
        type="range"
        id={inputId}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-gray-200 dark:bg-gray-600 accent-gray-900 dark:accent-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 focus-visible:ring-offset-2 cursor-pointer touch-manipulation"
        {...props}
      />
    </div>
  );
}
