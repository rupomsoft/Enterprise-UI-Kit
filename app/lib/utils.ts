import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names with Tailwind conflict resolution. Use for all component className props. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
