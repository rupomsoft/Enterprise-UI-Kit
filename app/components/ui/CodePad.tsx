"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { IconButton } from "./IconButton";

const codePadRoot =
  "rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/80 overflow-hidden min-w-0 w-full";

const codePadHeader =
  "flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-600 bg-gray-100/80 dark:bg-gray-800 text-gray-600 dark:text-gray-400";

const codePadPre =
  "p-3 sm:p-4 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre";

export interface CodePadProps {
  /** Code content to display */
  code: string;
  /** Language label shown in header (e.g. "tsx", "bash") */
  language?: string;
  /** Show copy button in header. Default true. */
  showCopy?: boolean;
  /** Optional title shown before language in header */
  title?: string;
  className?: string;
}

export function CodePad({
  code,
  language,
  showCopy = true,
  title,
  className,
}: CodePadProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [code]);

  const hasHeader = title || language || showCopy;

  return (
    <div className={cn(codePadRoot, className)}>
      {hasHeader && (
        <div className={codePadHeader}>
          <div className="flex items-center gap-2 min-w-0 truncate">
            {title && (
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                {title}
              </span>
            )}
            {language && (
              <span
                className={cn(
                  "text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 truncate",
                  title && "border-l border-gray-300 dark:border-gray-600 pl-2"
                )}
              >
                {language}
              </span>
            )}
          </div>
          {showCopy && (
            <IconButton
              aria-label={copied ? "Copied" : "Copy code"}
              icon={copied ? <Check className="size-4 text-green-600 dark:text-green-400" /> : <Copy className="size-4" />}
              onClick={handleCopy}
              className="shrink-0"
            />
          )}
        </div>
      )}
      <pre className={codePadPre}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
