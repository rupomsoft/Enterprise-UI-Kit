"use client";

import { useEffect, useRef, type ReactNode } from "react";

export interface LogoCarouselProps {
  /** Logo items (images or nodes). Duplicated for infinite scroll. */
  children: ReactNode[];
  /** Scroll speed in pixels per second (default 40) */
  speed?: number;
  className?: string;
  /** Gap between logos (default 3rem) */
  gap?: string;
}

export function LogoCarousel({
  children,
  speed = 40,
  className = "",
  gap = "3rem",
}: LogoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || children.length === 0) return;
    let start: number | null = null;
    const step = (t: number) => {
      if (start == null) start = t;
      const dt = (t - start) / 1000;
      start = t;
      el.scrollLeft += speed * dt;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max) el.scrollLeft -= max / 2;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [children.length, speed]);

  if (children.length === 0) return null;

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`.trim()}
    >
      <div
        ref={scrollRef}
        className="flex items-center gap-8 py-4 overflow-x-auto scrollbar-none"
        style={{ gap, scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {[...children, ...children].map((child, i) => (
          <div
            key={i}
            className="shrink-0 flex items-center justify-center grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
            style={{ minWidth: 120 }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
