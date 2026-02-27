"use client";

import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";

export interface TestimonialSlide {
  quote: string;
  name: string;
  role?: string;
  avatar?: React.ReactNode;
  /** Initials for Avatar if no avatar (e.g. "JD") */
  initials?: string;
}

export interface TestimonialCarouselProps {
  slides: TestimonialSlide[];
  className?: string;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
}

export function TestimonialCarousel({
  slides,
  className = "",
  autoPlay = true,
  autoPlayIntervalMs = 6000,
}: TestimonialCarouselProps) {
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
      className={`relative rounded-[10px] overflow-hidden border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6 sm:p-8 ${className}`.trim()}
    >
      <blockquote className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed italic">
        &ldquo;{slide.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 mt-4">
        {slide.avatar ? (
          <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
            {slide.avatar}
          </div>
        ) : (
          <Avatar size="md" bgClass="bg-emerald-500 text-white">
            {slide.initials ?? slide.name.slice(0, 2).toUpperCase()}
          </Avatar>
        )}
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {slide.name}
          </p>
          {slide.role && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{slide.role}</p>
          )}
        </div>
      </div>
      {count > 1 && (
        <div className="flex items-center justify-between gap-4 pt-4">
          <div className="flex justify-start gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === safeIndex
                    ? "bg-gray-900 dark:bg-gray-100"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1 shrink-0">
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
