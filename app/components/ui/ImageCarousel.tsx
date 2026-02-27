"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface ImageCarouselSlide {
  /** Image content (e.g. next/image or img) */
  image: ReactNode;
  /** Optional alt or caption */
  alt?: string;
}

export interface ImageCarouselProps {
  slides: ImageCarouselSlide[];
  className?: string;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
  /** Aspect ratio class (e.g. aspect-video, aspect-[4/3]) */
  aspectClass?: string;
}

export function ImageCarousel({
  slides,
  className = "",
  autoPlay = true,
  autoPlayIntervalMs = 4000,
  aspectClass = "aspect-video",
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const safeIndex = count > 0 ? ((index % count) + count) % count : 0;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el || count <= 1) return;
    const target = ((i % count) + count) % count;
    const run = () => {
      const w = el.clientWidth;
      if (w > 0) {
        el.scrollTo({ left: target * w, behavior: "smooth" });
      }
    };
    requestAnimationFrame(run);
  };

  const go = (i: number) => {
    setIndex(i);
    scrollToIndex(i);
  };
  const next = () => {
    const nextIndex = (safeIndex + 1) % count;
    setIndex(nextIndex);
    scrollToIndex(nextIndex);
  };
  const prev = () => {
    const prevIndex = (safeIndex - 1 + count) % count;
    setIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), autoPlayIntervalMs);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayIntervalMs, count]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || count <= 1) return;
    const w = el.clientWidth;
    if (w > 0) {
      el.scrollTo({ left: safeIndex * w, behavior: "smooth" });
    }
  }, [safeIndex, count]);

  if (count === 0) return null;

  return (
    <div
      className={`relative rounded-[10px] overflow-hidden border border-gray-200 dark:border-gray-600 ${className}`.trim()}
    >
      <div
        ref={scrollRef}
        className={`overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex ${aspectClass} bg-gray-100 dark:bg-gray-800/50`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const w = el.clientWidth;
          const i = Math.round(el.scrollLeft / w);
          if (i >= 0 && i < count) setIndex(i);
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-full h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover"
          >
            {slide.image}
          </div>
        ))}
      </div>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700"
            aria-label="Next"
          >
            ›
          </button>
          <div className="flex justify-center gap-1.5 py-2 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent pt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === safeIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
