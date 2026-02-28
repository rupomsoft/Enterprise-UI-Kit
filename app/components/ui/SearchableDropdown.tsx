"use client";

import { useRef, useState, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { inputBase, labelBase } from "./styles";

const ITEM_HEIGHT_PX = 40;
const OVERSCAN = 4;

export interface SearchableDropdownOption {
  value: string;
  label: string;
}

export interface SearchableDropdownProps {
  options: SearchableDropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  searchPlaceholder?: string;
}

export function SearchableDropdown({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Select...",
  label,
  labelClassName,
  id: idProp,
  className = "",
  disabled = false,
  searchPlaceholder = "Search...",
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [listScrollTop, setListScrollTop] = useState(0);
  const [listHeight, setListHeight] = useState(200);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const displayLabel = useMemo(() => {
    if (!value) return placeholder;
    const opt = options.find((o) => o.value === value);
    return opt?.label ?? value;
  }, [value, options, placeholder]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.trim().toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search]);

  const totalHeight = filteredOptions.length * ITEM_HEIGHT_PX;
  const visibleCount = Math.ceil(listHeight / ITEM_HEIGHT_PX);
  const scrollStartIndex = Math.floor(listScrollTop / ITEM_HEIGHT_PX);
  const scrollEndIndex = scrollStartIndex + visibleCount;
  const { startIndex, endIndex } = useMemo(() => {
    let start = Math.max(0, scrollStartIndex - OVERSCAN);
    let end = Math.min(filteredOptions.length, scrollEndIndex + OVERSCAN);
    if (filteredOptions.length === 0) return { startIndex: 0, endIndex: 0 };
    start = Math.min(start, highlightIndex);
    end = Math.max(end, highlightIndex + 1);
    start = Math.max(0, start);
    end = Math.min(filteredOptions.length, end);
    return { startIndex: start, endIndex: end };
  }, [scrollStartIndex, scrollEndIndex, filteredOptions.length, highlightIndex]);

  const visibleOptions = useMemo(
    () => filteredOptions.slice(startIndex, endIndex).map((opt, idx) => ({ opt, globalIndex: startIndex + idx })),
    [filteredOptions, startIndex, endIndex]
  );

  const setValue = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [isControlled, onChange]
  );

  const inputId =
    idProp ?? (label ? `searchable-dropdown-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // When opening: focus search, reset highlight and search
  useEffect(() => {
    if (open) {
      setSearch("");
      setHighlightIndex(0);
      setListScrollTop(0);
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [open]);

  // Reset scroll when filter changes
  useEffect(() => {
    setListScrollTop(0);
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [search]);

  // Measure list container height when open
  useLayoutEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current;
    const measure = () => setListHeight(el.clientHeight || 200);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  // Scroll highlighted item into view (virtualized: set scroll position)
  useEffect(() => {
    if (!open || !listRef.current || filteredOptions.length === 0) return;
    const targetTop = highlightIndex * ITEM_HEIGHT_PX;
    const targetBottom = targetTop + ITEM_HEIGHT_PX;
    const { scrollTop, clientHeight } = listRef.current;
    if (targetTop < scrollTop) {
      listRef.current.scrollTop = targetTop;
      setListScrollTop(targetTop);
    } else if (targetBottom > scrollTop + clientHeight) {
      listRef.current.scrollTop = targetBottom - clientHeight;
      setListScrollTop(targetBottom - clientHeight);
    }
  }, [open, highlightIndex, filteredOptions.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        searchInputRef.current?.blur();
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[highlightIndex]) {
          setValue(filteredOptions[highlightIndex].value);
          setOpen(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSelect = (opt: SearchableDropdownOption) => {
    setValue(opt.value);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`space-y-1.5 min-w-0 ${className}`.trim()}
    >
      {label && inputId && (
        <label htmlFor={inputId} className={cn(labelBase, labelClassName)}>
          {label}
        </label>
      )}
      <div className="relative min-w-0">
        <button
          type="button"
          id={inputId}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label ? undefined : placeholder}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          className={`${inputBase} pr-9 text-left cursor-pointer flex items-center min-w-0 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`.trim()}
        >
          <span className="truncate flex-1 min-w-0">
            {!value && placeholder ? (
              <span className="text-gray-400 dark:text-gray-500">
                {placeholder}
              </span>
            ) : (
              displayLabel
            )}
          </span>
        </button>
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        {open && (
          <div
            className="absolute z-20 mt-1 w-full min-w-0 rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg overflow-hidden flex flex-col max-h-[min(50vh,320px)]"
            role="listbox"
          >
            <div className="p-2 border-b border-gray-100 dark:border-gray-700 shrink-0">
              <div className="relative">
                <Search
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
                  aria-hidden
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setHighlightIndex(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setOpen(false);
                      searchInputRef.current?.blur();
                      return;
                    }
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setHighlightIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
                      return;
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setHighlightIndex((i) => Math.max(i - 1, 0));
                      return;
                    }
                    if (e.key === "Enter" && filteredOptions[highlightIndex]) {
                      e.preventDefault();
                      setValue(filteredOptions[highlightIndex].value);
                      setOpen(false);
                    }
                  }}
                  placeholder={searchPlaceholder}
                  className={`${inputBase} pl-9 h-9 min-h-0 py-2 text-sm`}
                  aria-label={searchPlaceholder}
                />
              </div>
            </div>
            <div
              ref={listRef}
              className="overflow-y-auto flex-1 min-h-0"
              onScroll={(e) => setListScrollTop(e.currentTarget.scrollTop)}
            >
              {filteredOptions.length === 0 ? (
                <p className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                  No results
                </p>
              ) : (
                <div
                  style={{ height: totalHeight, position: "relative" }}
                  role="presentation"
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: startIndex * ITEM_HEIGHT_PX,
                    }}
                  >
                    {visibleOptions.map(({ opt, globalIndex: i }) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={value === opt.value}
                        data-highlighted={i === highlightIndex}
                        style={{ height: ITEM_HEIGHT_PX }}
                        className={`w-full text-left px-3 text-sm flex items-center touch-manipulation transition-colors border-0 ${
                          value === opt.value
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        } ${i === highlightIndex ? "bg-gray-50 dark:bg-gray-700/70" : ""}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelect(opt);
                        }}
                        onMouseEnter={() => setHighlightIndex(i)}
                      >
                        <span className="truncate">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
