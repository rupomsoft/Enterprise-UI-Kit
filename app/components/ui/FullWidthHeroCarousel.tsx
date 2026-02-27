"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "./Button";

export interface FullWidthHeroSlide {
  /** Background (image or video element) */
  background: ReactNode;
  /** Overlay title */
  title: string;
  /** Overlay subtitle */
  subtitle?: string;
  /** CTA button */
  cta?: { label: string; href?: string; onClick?: () => void };
}

export interface FullWidthHeroCarouselProps {
  slides: FullWidthHeroSlide[];
  className?: string;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
}

export function FullWidthHeroCarousel({
  slides,
  className = "",
  autoPlay = true,
  autoPlayIntervalMs = 5000,
}: FullWidthHeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const safeIndex = count > 0 ? ((index % count) + count) % count : 0;
  const slide = slides[safeIndex];

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);
  const go = (i: number) => setIndex(i);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const id = setInterval(() => setIndex((i) => i + 1), autoPlayIntervalMs);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayIntervalMs, count]);

  if (count === 0 || !slide) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[10px] ${className}`.trim()}
    >
      <div className="relative aspect-[21/9] min-h-[200px] bg-gray-900">
        <div className="absolute inset-0 [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>video]:w-full [&>video]:h-full [&>video]:object-cover">
          {slide.background}
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{slide.title}</h2>
          {slide.subtitle && (
            <p className="text-sm sm:text-base text-white/90 mb-4 max-w-lg">
              {slide.subtitle}
            </p>
          )}
          {slide.cta && (
            <div>
              {slide.cta.href ? (
                <a href={slide.cta.href}>
                  <Button variant="primary" className="!bg-white !text-gray-900 hover:!bg-gray-100">
                    {slide.cta.label}
                  </Button>
                </a>
              ) : (
                <Button
                  variant="primary"
                  className="!bg-white !text-gray-900 hover:!bg-gray-100"
                  onClick={slide.cta.onClick}
                >
                  {slide.cta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
            aria-label="Next"
          >
            ›
          </button>
          <div className="flex justify-center gap-2 py-3 absolute bottom-0 left-0 right-0">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === safeIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
