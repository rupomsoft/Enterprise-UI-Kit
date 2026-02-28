"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

export interface ProductCardProps {
  /** Image shown at top (ReactNode e.g. next/image, or pass a wrapper div) */
  image: ReactNode;
  /** Product name */
  title: string;
  /** Optional short description */
  description?: string;
  /** Price display (e.g. "$24.99") */
  price: ReactNode;
  /** Optional compare-at price (e.g. "$29.99" shown with strikethrough) */
  compareAtPrice?: ReactNode;
  /** Optional link for the card/title (entire card or title only) */
  href?: string;
  /** Optional primary action (e.g. Add to cart) */
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  /** Optional badge above image (e.g. "Sale", "New") */
  badge?: ReactNode;
  /** Optional footer row below action (e.g. rating + Quick view) */
  footer?: ReactNode;
  /** Aspect ratio of the image area (default aspect-square). Use aspect-video or aspect-[4/3] for shorter image. */
  imageAspect?: string;
  className?: string;
}

export function ProductCard({
  image,
  title,
  description,
  price,
  compareAtPrice,
  href,
  action,
  badge,
  footer,
  imageAspect = "aspect-square",
  className = "",
}: ProductCardProps) {
  const content = (
    <>
      <div className={`relative ${imageAspect} w-full overflow-hidden rounded-t-[10px] bg-gray-100 dark:bg-gray-700`}>
        <div className="absolute inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
          {image}
        </div>
        {badge != null && (
          <div className="absolute left-2 top-2 shrink-0">
            {badge}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4 sm:p-5">
        <div>
          {href ? (
            <Link href={href} className="focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 rounded">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:underline">
                {title}
              </h3>
            </Link>
          ) : (
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {title}
            </h3>
          )}
          {description != null && description !== "" && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-0.5">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
            {price}
          </span>
          {compareAtPrice != null && (
            <span className="text-xs text-gray-400 dark:text-gray-500 line-through tabular-nums">
              {compareAtPrice}
            </span>
          )}
        </div>
        {action != null && (
          <div className="mt-2">
            {action.href ? (
              <Link href={action.href}>
                <Button variant="secondary" className="w-full">
                  {action.label}
                </Button>
              </Link>
            ) : (
              <Button variant="secondary" className="w-full" onClick={action.onClick}>
                {action.label}
              </Button>
            )}
          </div>
        )}
        {footer != null && <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">{footer}</div>}
      </div>
    </>
  );

  return (
    <Card noPadding className={className}>
      {content}
    </Card>
  );
}
