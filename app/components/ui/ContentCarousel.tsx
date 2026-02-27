"use client";

import { useEffect, useState, type ReactNode } from "react";

export interface ContentCarouselSlide {
  /** Optional image or media */
  media?: ReactNode;
  /** Main text content */
  content: ReactNode;
  /** Optional title for the slide */
  title?: string;
}

export interface ContentCarouselProps {
  slides: ContentCarouselSlide[];
  className?: string;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
}

export function ContentCarousel({
  slides,
  className = "",
  autoPlay = false,
  autoPlayIntervalMs = 5000,
}: ContentCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const safeIndex = count > 0 ? ((index % count) + count) % count : 0;
  const slide = slides[safeIndex];

  const go = (i: number) => setIndex(i);
  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const id = setInterval(() => setIndex((i) => i + 1), autoPlayIntervalMs);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayIntervalMs, count]);

  if (count === 0 || !slide) return null;

  return (
    <div
      className={`relative rounded-[10px] overflow-hidden border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 ${className}`.trim()}
    >
      <div className="flex flex-col sm:flex-row min-h-[200px]">
        {slide.media && (
          <div className="sm:w-2/5 shrink-0 min-w-0 aspect-video sm:aspect-auto sm:min-h-[200px] bg-gray-100 dark:bg-gray-700/50 [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
            {slide.media}
          </div>
        )}
        <div className="flex-1 p-6 flex flex-col justify-center">
          {slide.title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {slide.title}
            </h3>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {slide.content}
          </div>
        </div>
      </div>
      {count > 1 && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Step ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === safeIndex
                    ? "w-6 bg-gray-900 dark:bg-gray-100"
                    : "w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
