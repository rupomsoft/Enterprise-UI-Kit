"use client";

import { useRef, useState, type ReactNode } from "react";

const GAP = 16;

export interface CardCarouselProps {
  /** Card items to show (e.g. Card components) */
  children: ReactNode[];
  /** Number of items visible at once (default 3) */
  itemsPerView?: number;
  className?: string;
}

export function CardCarousel({
  children,
  itemsPerView = 3,
  className = "",
}: CardCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = children.length;
  const maxIndex = Math.max(0, count - itemsPerView);
  const safeIndex = Math.min(Math.max(0, index), maxIndex);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToIndex = (i: number) => {
    const target = Math.min(Math.max(0, i), maxIndex);
    setIndex(target);
    const container = scrollRef.current;
    const slide = slideRefs.current[target];
    if (container && slide) {
      const left = slide.offsetLeft;
      container.scrollTo({ left, behavior: "smooth" });
    }
  };

  const next = () => scrollToIndex(safeIndex + 1);
  const prev = () => scrollToIndex(safeIndex - 1);
  const go = (i: number) => scrollToIndex(i);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || count <= itemsPerView) return;
    const scrollLeft = container.scrollLeft;
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;
    const gap = GAP;
    const firstWidth = slides[0]?.offsetWidth ?? 0;
    if (firstWidth <= 0) return;
    const step = firstWidth + gap;
    const i = Math.round(scrollLeft / step);
    const clamped = Math.min(Math.max(0, i), maxIndex);
    setIndex((prev) => (prev !== clamped ? clamped : prev));
  };

  if (count === 0) return null;

  return (
    <div className={`rounded-[10px] ${className}`.trim()}>
      {count > itemsPerView ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={safeIndex === 0}
            className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="flex-1 min-w-0 rounded-[10px] overflow-hidden">
            <div
              ref={scrollRef}
              className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-stretch scroll-smooth"
              style={{
                gap: GAP,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onScroll={handleScroll}
            >
              {children.map((child, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  className="snap-center shrink-0 flex-[0_0_auto] flex flex-col min-h-0"
                  style={{
                    width: `calc((100% - ${(itemsPerView - 1) * GAP}px) / ${itemsPerView})`,
                    minWidth: 200,
                  }}
                >
                  <div className="flex-1 min-h-0 flex flex-col [&>*]:flex-1 [&>*]:min-h-0">
                    {child}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={next}
            disabled={safeIndex >= maxIndex}
            className="shrink-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex items-stretch scroll-smooth rounded-[10px] overflow-hidden"
          style={{
            gap: GAP,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={handleScroll}
        >
          {children.map((child, i) => (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="snap-center shrink-0 flex-[0_0_auto] flex flex-col min-h-0"
              style={{
                width: `calc((100% - ${(itemsPerView - 1) * GAP}px) / ${itemsPerView})`,
                minWidth: 200,
              }}
            >
              <div className="flex-1 min-h-0 flex flex-col [&>*]:flex-1 [&>*]:min-h-0">
                {child}
              </div>
            </div>
          ))}
        </div>
      )}
      {count > itemsPerView && (
        <div className="flex justify-center gap-1.5 py-2 mt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Page ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                i === safeIndex
                  ? "bg-gray-900 dark:bg-gray-100"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
