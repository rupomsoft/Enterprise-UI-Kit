"use client";

import { type ReactNode } from "react";

export interface IconBoxProps {
  icon: ReactNode;
  rounded?: "square" | "full";
  size?: "sm" | "md";
  className?: string;
}

const sizeClass = { sm: "w-8 h-8", md: "w-10 h-10" };

export function IconBox({
  icon,
  rounded = "square",
  size = "md",
  className = "",
}: IconBoxProps) {
  const roundedClass = rounded === "full" ? "rounded-full" : "rounded-[8px]";
  return (
    <div
      className={`${sizeClass[size]} ${roundedClass} bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 [&>svg]:w-5 [&>svg]:h-5 ${className}`.trim()}
    >
      {icon}
    </div>
  );
}
