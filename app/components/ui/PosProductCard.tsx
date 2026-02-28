"use client";

import { type ReactNode } from "react";
import { cn } from "@/app/lib/utils";
import { Card } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";

const DEFAULT_IMAGE_PLACEHOLDER = (
  <div className="w-full h-full bg-gray-200 dark:bg-gray-600" />
);

export interface PosProductCardProps {
  /** Product id (for add to cart) */
  id: string;
  /** Product name */
  name: string;
  /** Unit price (number, will be formatted with currency) */
  price: number;
  /** Stock quantity (shown as badge) */
  stock: number;
  /** Image content (e.g. next/image or placeholder div) */
  image?: ReactNode;
  /** Called when "Add to cart" is clicked */
  onAddToCart: () => void;
  /** Currency symbol (e.g. "৳" or "$"). Default "৳". */
  currency?: string;
  /** Aspect ratio of image area. Default "aspect-video". */
  imageAspect?: string;
  /** Add to cart button label. Default "Add to cart". */
  addToCartLabel?: string;
  /** When true, render as a compact horizontal list row (e.g. for mobile list view). */
  listView?: boolean;
  className?: string;
}

export function PosProductCard({
  id: _id, // used by parent for list key / identification
  name,
  price,
  stock,
  image,
  onAddToCart,
  currency = "৳",
  imageAspect = "aspect-video",
  addToCartLabel = "Add to cart",
  listView = false,
  className,
}: PosProductCardProps) {
  if (listView) {
    return (
      <Card noPadding className={cn("!p-0", className)}>
        <div className="flex w-full items-stretch gap-3 overflow-hidden">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-l-[10px] bg-gray-100 dark:bg-gray-700 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>div]:h-full [&>div]:w-full">
            {image ?? <div className="h-full w-full min-h-[80px] min-w-[80px] bg-gray-200 dark:bg-gray-600" />}
            <div className="absolute left-1 top-1">
              <Badge variant="default" rounded="md" className="!cursor-default text-xs">
                {stock}
              </Badge>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-2 pr-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 leading-snug">
              {name}
            </h3>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
                {currency}
                {price.toLocaleString()}
              </span>
              <Button
                variant="secondary"
                className="shrink-0 min-h-[36px] px-3 touch-manipulation"
                onClick={onAddToCart}
              >
                {addToCartLabel}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card noPadding className={cn("h-full flex flex-col overflow-hidden", className)}>
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden rounded-t-[10px] bg-gray-100 dark:bg-gray-700",
          imageAspect
        )}
      >
        <div className="absolute inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
          {image ?? DEFAULT_IMAGE_PLACEHOLDER}
        </div>
        <div className="absolute left-2 top-2 flex items-center gap-2 pointer-events-none">
          <Badge variant="default" rounded="md" className="!cursor-default shrink-0">
            {stock}
          </Badge>
          <Badge variant="default" rounded="md" className="!cursor-default shrink-0 text-xs font-semibold tabular-nums">
            {currency}{price.toLocaleString()}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 min-h-0 flex-col gap-2 p-3 sm:p-4 lg:p-5">
        <h3 className="text-sm font-light text-gray-900 dark:text-gray-100 line-clamp-1 truncate leading-snug min-w-0" title={name}>
          {name}
        </h3>
        <Button
          variant="secondary"
          className="w-full min-h-[44px] sm:min-h-[36px] touch-manipulation shrink-0"
          onClick={onAddToCart}
        >
          {addToCartLabel}
        </Button>
      </div>
    </Card>
  );
}
