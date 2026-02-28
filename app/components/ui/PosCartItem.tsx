"use client";

import { type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { inputBase } from "./styles";

const inputFieldClass = cn(
  inputBase,
  "px-2 text-xs w-full min-w-0 !bg-gray-50 dark:!bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-[6px] touch-manipulation",
  "min-h-[44px] sm:!min-h-[28px] sm:!h-7"
);

export interface PosCartItemProps {
  /** Product name */
  name: string;
  /** Product image (e.g. next/image or a placeholder div) */
  image: ReactNode;
  /** Variant/attributes text, e.g. "Black (M Size)" or "No variant" */
  variant?: string;
  /** Unit price */
  price: number;
  /** Quantity */
  quantity: number;
  /** Discount amount for this line */
  discount: number;
  onQuantityChange: (delta: number) => void;
  onDiscountChange: (value: number) => void;
  onRemove: () => void;
  /** Currency symbol, e.g. "৳" or "$" */
  currency?: string;
  className?: string;
}

export function PosCartItem({
  name,
  image,
  variant = "No variant",
  price,
  quantity,
  discount,
  onQuantityChange,
  onDiscountChange,
  onRemove,
  currency = "৳",
  className,
}: PosCartItemProps) {
  const total = Math.max(0, price * quantity - (discount || 0));

  return (
    <article
      className={cn(
        "flex flex-col rounded-[10px] border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 overflow-hidden",
        className
      )}
    >
      {/* Upper row: image | title, variant, price, X */}
      <div className="flex flex-1 min-w-0 p-2">
        <div className="m-1 shrink-0 w-14 h-14 sm:w-[56px] sm:h-[56px] rounded-[8px] bg-white dark:bg-gray-700 overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
          {image}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center pl-1">
          <div className="flex justify-between items-center gap-1 min-h-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate min-w-0">
              {name}
            </h3>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove item"
              className="shrink-0 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1 flex items-center justify-center rounded text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 active:bg-red-100 dark:active:bg-red-900/30 transition-colors touch-manipulation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-px">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate min-w-0">
              {variant}
            </p>
            <div className="text-left">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currency}
                {price.toLocaleString()} × {quantity} =
              </span>{" "}
              <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
                {currency}
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Below row: full width, 3 equal divs — qty | discount | total tag */}
      <div className="grid grid-cols-3 gap-2 sm:gap-1.5 p-2 pt-0 w-full items-center">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!Number.isNaN(v) && v >= 0) onQuantityChange(v - quantity);
          }}
          className={inputFieldClass}
          aria-label="Quantity"
        />
        <input
          type="number"
          min={0}
          value={discount || ""}
          onChange={(e) => onDiscountChange(Number(e.target.value) || 0)}
          placeholder="Discount"
          className={inputFieldClass}
          aria-label="Discount"
        />
        <span
          className={cn(
            "inline-flex items-center justify-center min-h-[44px] sm:min-h-[32px] sm:h-7 px-2 rounded-[6px] border border-gray-200 dark:border-gray-600",
            "bg-gray-50 dark:bg-gray-700 text-xs font-semibold text-gray-900 dark:text-gray-100 tabular-nums min-w-0"
          )}
          role="text"
        >
          {currency}
          {total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </article>
  );
}
