"use client";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  "aria-label"?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  "aria-label": ariaLabel,
}: SwitchProps) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer min-w-0">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel ?? label}
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 focus-visible:ring-offset-2 cursor-pointer ${
          checked
            ? "bg-gray-900 dark:bg-gray-100 border-transparent"
            : "bg-gray-200 dark:bg-gray-600 border-gray-200 dark:border-gray-600"
        }`}
      >
        <span
          className={`pointer-events-none block h-5 w-5 shrink-0 rounded-full bg-white dark:bg-gray-900 shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
      {label && (
        <span className="text-sm leading-none text-gray-700 dark:text-gray-300 select-none">
          {label}
        </span>
      )}
    </label>
  );
}
