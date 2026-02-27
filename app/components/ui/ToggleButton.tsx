"use client";

import { type ReactNode } from "react";
import { Sun, Moon } from "lucide-react";

const baseClass =
  "inline-flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer";

const pressedClass =
  "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900";
const unpressedClass =
  "border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700";

export interface ToggleButtonProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  labelOn?: string;
  labelOff?: string;
  iconOn?: ReactNode;
  iconOff?: ReactNode;
  className?: string;
}

export function ToggleButton({
  pressed,
  onPressedChange,
  labelOn = "On",
  labelOff = "Off",
  iconOn = <Sun className="w-4 h-4" />,
  iconOff = <Moon className="w-4 h-4" />,
  className = "",
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onPressedChange(!pressed)}
      className={`${baseClass} ${pressed ? pressedClass : unpressedClass} ${className}`.trim()}
      aria-pressed={pressed}
    >
      {pressed ? iconOn : iconOff}
      {pressed ? labelOn : labelOff}
    </button>
  );
}
