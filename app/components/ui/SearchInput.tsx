"use client";

import { Search } from "lucide-react";
import { type InputHTMLAttributes } from "react";
import { inputBase } from "./styles";

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
}

export function SearchInput({ className = "", ...props }: SearchInputProps) {
  return (
    <div className="relative flex items-center min-h-[36px] w-full min-w-0">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none shrink-0"
        aria-hidden
      />
      <input
        type="search"
        className={`${inputBase} pl-9 w-full min-w-0 ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
