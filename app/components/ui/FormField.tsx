import { type ReactNode } from "react";
import { labelBase, hintClass, errorClass } from "./styles";

export interface FormFieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
  /** Associate label with control for accessibility (e.g. id of the input). */
  htmlFor?: string;
}

export function FormField({
  label,
  children,
  hint,
  error,
  htmlFor,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5 min-w-0">
      <label htmlFor={htmlFor} className={labelBase}>
        {label}
      </label>
      {children}
      {hint && <p className={hintClass}>{hint}</p>}
      {error && (
        <p role="alert" className={errorClass}>
          {error}
        </p>
      )}
    </div>
  );
}
