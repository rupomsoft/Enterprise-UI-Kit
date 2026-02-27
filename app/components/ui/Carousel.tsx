"use client";

import { useEffect, useState, type ReactNode } from "react";

export interface CarouselProps {
  children: ReactNode[];
  className?: string;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
}

export function Carousel({
  children,
  className = "",
  autoPlay = false,
  autoPlayIntervalMs = 4000,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const count = children.length;
  const safeIndex = count > 0 ? ((index % count) + count) % count : 0;
  const current = children[safeIndex];

  const go = (i: number) => setIndex(i);
  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const id = setInterval(() => setIndex((i) => i + 1), autoPlayIntervalMs);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayIntervalMs, count]);

  if (count === 0) return null;

  return (
    <div className={`relative rounded-[10px] overflow-hidden border border-gray-200 dark:border-gray-600 ${className}`.trim()}>
      <div className="relative min-h-[120px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 p-6">
        {current}
      </div>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            aria-label="Next"
          >
            ›
          </button>
          <div className="flex justify-center gap-1.5 py-2">
            {children.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  i === safeIndex
                    ? "bg-gray-900 dark:bg-gray-100"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
