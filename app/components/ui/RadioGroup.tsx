"use client";

import { type ReactNode } from "react";
import { hintClass } from "./styles";
import { Radio } from "./Radio";
import type { RadioOption } from "./Radio";

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  hint?: ReactNode;
}

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  hint,
}: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {label != null && (
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      <Radio name={name} options={options} value={value} onChange={onChange} />
      {hint != null && <p className={hintClass}>{hint}</p>}
    </div>
  );
}
