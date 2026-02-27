"use client";

export interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  block?: boolean;
}

export function Section({ title, description, children, block }: SectionProps) {
  return (
    <section className="space-y-3 min-w-0 w-full">
      <header className="min-w-0">
        <h2 className="text-base sm:text-lg font-semibold text-[#1A1A1A] dark:text-gray-100 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </header>
      <div
        className={
          block ? "block space-y-2 min-w-0 w-full" : "flex flex-wrap items-center gap-3 min-w-0 w-full"
        }
      >
        {children}
      </div>
    </section>
  );
}
