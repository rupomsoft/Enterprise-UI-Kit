"use client";

import { CodePad, Section } from "@/app/components/ui";

export interface HowToUseEntry {
  label: string;
  code: string;
  language?: string;
  title?: string;
}

export interface HowToUseSectionProps {
  title?: string;
  description: string;
  entries: HowToUseEntry[];
}

const STEP_LABEL_CLASS = "text-sm font-medium text-gray-700 dark:text-gray-300";
const WRAPPER_CLASS = "space-y-4 w-full min-w-0 max-w-2xl";
const ENTRY_CLASS = "space-y-1.5";

export function HowToUseSection({
  title = "How to use",
  description,
  entries,
}: HowToUseSectionProps) {
  return (
    <Section title={title} description={description} block>
      <div className={WRAPPER_CLASS}>
        {entries.map((entry, index) => (
          <div key={index} className={ENTRY_CLASS}>
            <p className={STEP_LABEL_CLASS}>
              {entries.length > 1 ? `${index + 1}. ${entry.label}` : entry.label}
            </p>
            <CodePad
              code={entry.code}
              language={entry.language ?? "tsx"}
              title={entry.title}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
