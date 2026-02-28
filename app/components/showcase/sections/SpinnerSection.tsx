"use client";

import {
  BarSpinner,
  BounceSpinner,
  ClockSpinner,
  DotSpinner,
  DuelRingSpinner,
  OrbitSpinner,
  RingFadeSpinner,
  RingSpinner,
  RippleSpinner,
  Section,
  SquareFlipSpinner,
} from "@/app/components/ui";
import type { RingSpinnerSize } from "@/app/components/ui/RingSpinner";

const SIZES: { size: RingSpinnerSize; label: string }[] = [
  { size: "sm", label: "SM" },
  { size: "md", label: "MD" },
  { size: "lg", label: "LG" },
];

export function SpinnerSection() {
  return (
    <Section title="Spinner">
      <div className="flex flex-wrap gap-10">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            RingSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`ring-${size}`} className="flex flex-col items-center gap-2">
                <RingSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            SquareFlipSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`square-flip-${size}`} className="flex flex-col items-center gap-2">
                <SquareFlipSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            DuelRingSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`duel-${size}`} className="flex flex-col items-center gap-2">
                <DuelRingSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            OrbitSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`orbit-${size}`} className="flex flex-col items-center gap-2">
                <OrbitSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            BarSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`bar-${size}`} className="flex flex-col items-center gap-2">
                <BarSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            BounceSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`bounce-${size}`} className="flex flex-col items-center gap-2">
                <BounceSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            DotSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`dot-${size}`} className="flex flex-col items-center gap-2">
                <DotSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            RingFadeSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`ring-fade-${size}`} className="flex flex-col items-center gap-2">
                <RingFadeSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            ClockSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`clock-${size}`} className="flex flex-col items-center gap-2">
                <ClockSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            RippleSpinner
          </p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map(({ size, label }) => (
              <div key={`ripple-${size}`} className="flex flex-col items-center gap-2">
                <RippleSpinner size={size} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
