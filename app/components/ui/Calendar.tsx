"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./Button";
import { Popover } from "./Popover";
import type { ButtonVariant } from "./Button";

export interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  triggerVariant?: ButtonVariant;
  triggerLabel?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const days = last.getDate();
  const pad: null[] = Array(startPad).fill(null);
  const dayNumbers = Array.from({ length: days }, (_, i) => i + 1);
  return [...pad, ...dayNumbers];
}

export function Calendar({
  value = null,
  onChange,
  className = "",
  minDate,
  maxDate,
  triggerVariant = "secondary",
  triggerLabel = "Pick date",
}: CalendarProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => value ?? new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const days = getDaysInMonth(year, month);

  const canPrev = minDate
    ? new Date(year, month - 1) >= new Date(minDate.getFullYear(), minDate.getMonth())
    : true;
  const canNext = maxDate
    ? new Date(year, month + 1) <= new Date(maxDate.getFullYear(), maxDate.getMonth() + 1)
    : true;

  const handlePrev = () => {
    if (canPrev) setViewDate(new Date(year, month - 1));
  };
  const handleNext = () => {
    if (canNext) setViewDate(new Date(year, month + 1));
  };

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const handleDay = (day: number) => {
    const d = new Date(year, month, day);
    if (isDisabled(day)) return;
    onChange?.(d);
    setOpen(false);
  };

  const selected = value ? value.getTime() : null;

  const calendarContent = (
    <div className={`rounded-[10px] bg-transparent p-0 w-fit ${className}`.trim()}>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canPrev}
          className="p-1.5 rounded-[6px] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 tabular-nums">
          {viewDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canNext}
          className="p-1.5 rounded-[6px] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <span
            key={w}
            className="text-xs font-medium text-gray-500 dark:text-gray-400 py-1"
          >
            {w}
          </span>
        ))}
        {days.map((day, i) =>
          day === null ? (
            <span key={`e-${i}`} />
          ) : (
            <button
              key={day}
              type="button"
              onClick={() => handleDay(day)}
              disabled={isDisabled(day)}
              className={`w-8 h-8 rounded-[6px] text-sm tabular-nums transition-colors ${
                selected === new Date(year, month, day).getTime()
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {day}
            </button>
          )
        )}
      </div>
    </div>
  );

  const displayLabel = value
    ? value.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    : triggerLabel;
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant={triggerVariant}>
          <CalendarIcon className="w-4 h-4 shrink-0" />
          {displayLabel}
        </Button>
      }
    >
      <div className="rounded-[10px] bg-white dark:bg-gray-800 p-2.5 shadow-none">
        {calendarContent}
      </div>
    </Popover>
  );
}
