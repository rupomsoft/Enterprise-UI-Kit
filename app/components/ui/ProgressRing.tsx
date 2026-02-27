"use client";

export type ProgressRingVariant = "default" | "success";

export interface ProgressRingProps {
  value: number;
  variant?: ProgressRingVariant;
  size?: number;
}

export function ProgressRing({
  value,
  variant = "default",
  size = 64,
}: ProgressRingProps) {
  const pct = Math.min(100, Math.max(0, value));
  const stroke = variant === "success" ? "text-emerald-500 dark:text-emerald-500" : "text-gray-900 dark:text-gray-100";
  const r = 16;
  const circumference = 2 * Math.PI * r;
  const dash = (pct / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-gray-100 dark:text-gray-700"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="currentColor"
          className={stroke}
          strokeWidth="3"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-gray-100">
        {pct}%
      </span>
    </div>
  );
}
