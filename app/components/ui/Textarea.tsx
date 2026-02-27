"use client";

import { cn } from "@/app/lib/utils";
import { type TextareaHTMLAttributes } from "react";
import {
  labelBase,
  inputErrorClass,
  hintClass,
  errorClass,
} from "./styles";

const textareaBase =
  "w-full min-w-0 rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2.5 text-sm leading-normal placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-transparent transition-colors resize-y min-h-[80px]";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: TextareaProps) {
  const inputId =
    id ??
    (label
      ? `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`
      : undefined);
  const hasError = Boolean(error);
  return (
    <div className="space-y-1.5 min-w-0">
      {label && (
        <label htmlFor={inputId} className={labelBase}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        aria-invalid={hasError}
        className={cn(
          textareaBase,
          hasError && inputErrorClass,
          className
        )}
        {...props}
      />
      {hint && (
        <p id={inputId ? `${inputId}-hint` : undefined} className={hintClass}>
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
