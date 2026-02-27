"use client";

import { cn } from "@/app/lib/utils";
import { type InputHTMLAttributes } from "react";
import { inputBase, labelBase, inputErrorClass, hintClass, errorClass } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
  const inputId =
    id ??
    (label
      ? `input-${label.toLowerCase().replace(/\s+/g, "-")}`
      : undefined);
  const hasError = Boolean(error);
  return (
    <div className="space-y-1.5 min-w-0">
      {label && (
        <label htmlFor={inputId} className={labelBase}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={hasError}
        aria-describedby={
          inputId
            ? [hint && `${inputId}-hint`, error && `${inputId}-error`]
                .filter(Boolean)
                .join(" ") || undefined
            : undefined
        }
        className={cn(
          inputBase,
          hasError && inputErrorClass,
          className
        )}
        {...props}
      />
      {hint && (
        <p
          id={inputId ? `${inputId}-hint` : undefined}
          className={hintClass}
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          id={inputId ? `${inputId}-error` : undefined}
          role="alert"
          className={errorClass}
        >
          {error}
        </p>
      )}
    </div>
  );
}
