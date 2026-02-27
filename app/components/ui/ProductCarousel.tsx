"use client";

import { useRef, useState, type ReactNode } from "react";
import { ProductCard } from "./ProductCard";

const GAP = 16;

export interface ProductCarouselItem {
  image: ReactNode;
  title: string;
  description?: string;
  price: ReactNode;
  compareAtPrice?: ReactNode;
  rating?: number;
  reviewCount?: number;
  href?: string;
  onAddToCart?: () => void;
  onQuickView?: () => void;
  badge?: ReactNode;
}

export interface ProductCarouselProps {
  items: ProductCarouselItem[];
  /** Items visible at once (default 4) */
  itemsPerView?: number;
  className?: string;
}

export function ProductCarousel({
  items,
  itemsPerView = 4,
  className = "",
}: ProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = items.length;
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
      requestAnimationFrame(() => {
        container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
      });
    }
  };

  const next = () => scrollToIndex(safeIndex + 1);
  const prev = () => scrollToIndex(safeIndex - 1);
  const go = (i: number) => scrollToIndex(i);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || count <= itemsPerView) return;
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;
    const firstWidth = slides[0]?.offsetWidth ?? 0;
    if (firstWidth <= 0) return;
    const step = firstWidth + GAP;
    const i = Math.round(container.scrollLeft / step);
    const clamped = Math.min(Math.max(0, i), maxIndex);
    setIndex((prev) => (prev !== clamped ? clamped : prev));
  };

  if (count === 0) return null;

  return (
    <div className={`relative rounded-[10px] overflow-hidden ${className}`.trim()}>
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scroll-smooth"
        style={{
          gap: GAP,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={handleScroll}
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="snap-center shrink-0"
            style={{
              width: `calc((100% - ${(itemsPerView - 1) * GAP}px) / ${itemsPerView})`,
              minWidth: 180,
            }}
          >
            <ProductCard
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
              compareAtPrice={item.compareAtPrice}
              href={item.href}
              badge={item.badge}
              action={
                item.onAddToCart
                  ? { label: "Add to cart", onClick: item.onAddToCart }
                  : undefined
              }
            />
          </div>
        ))}
      </div>
      {count > itemsPerView && (
        <div className="flex items-center justify-center pt-4 pb-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prev}
              disabled={safeIndex === 0}
              className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none shadow text-sm"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              disabled={safeIndex >= maxIndex}
              className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none shadow text-sm"
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
