"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import Prism from "prismjs";
import { cn } from "@/app/lib/utils";
import { IconButton } from "./IconButton";

import "prismjs/themes/prism-tomorrow.css";
// Load in dependency order: clike → javascript → markup → jsx → typescript → tsx
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";

const codePadRoot =
  "rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/80 overflow-hidden min-w-0 w-full";

const codePadHeader =
  "flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-600 bg-gray-100/80 dark:bg-gray-800 text-gray-600 dark:text-gray-400";

const codePadPre =
  "p-3 sm:p-4 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre min-w-0 !m-0";

const codePadPrePlain =
  "text-gray-800 dark:text-gray-200";

function toPrismLanguage(lang: string | undefined): string {
  if (!lang) return "tsx";
  const map: Record<string, string> = {
    tsx: "tsx",
    ts: "typescript",
    js: "javascript",
    jsx: "jsx",
    json: "json",
    bash: "bash",
    shell: "bash",
    css: "css",
    html: "markup",
  };
  return map[lang.toLowerCase()] ?? lang;
}

export interface CodePadProps {
  /** Code content to display */
  code: string;
  /** Language for header label and syntax highlighting when syntaxHighlight is true (e.g. "tsx", "bash", "json") */
  language?: string;
  /** Enable syntax highlighting when language is set. Default true. */
  syntaxHighlight?: boolean;
  /** Show copy button in header. Default true. */
  showCopy?: boolean;
  /** Optional title shown before language in header */
  title?: string;
  className?: string;
}

export function CodePad({
  code,
  language,
  syntaxHighlight = true,
  showCopy = true,
  title,
  className,
}: CodePadProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [code]);

  const highlighted = useMemo(() => {
    if (!mounted || !syntaxHighlight || !language) return null;
    const prismLang = toPrismLanguage(language);
    let grammar = Prism.languages[prismLang];
    const effectiveLang = grammar ? prismLang : prismLang === "tsx" ? "typescript" : prismLang;
    if (!grammar) grammar = Prism.languages[effectiveLang];
    if (!grammar) return null;
    try {
      return Prism.highlight(code, grammar, effectiveLang);
    } catch {
      return null;
    }
  }, [code, language, syntaxHighlight, mounted]);

  const hasHeader = title || language || showCopy;
  const useHighlight = highlighted !== null;

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
      <pre className={cn(codePadPre, !useHighlight && codePadPrePlain)}>
        <code
          className={useHighlight ? `language-${toPrismLanguage(language)}` : undefined}
          {...(useHighlight ? { dangerouslySetInnerHTML: { __html: highlighted } } : { children: code })}
        />
      </pre>
    </div>
  );
}
