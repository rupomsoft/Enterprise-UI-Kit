"use client";

import { Input, SearchInput } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function InputSearchSection() {
  return (
    <Section title="Input & SearchInput">
      <div className="flex flex-col gap-1.5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Label
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-64">
            <Input placeholder="Placeholder" />
          </div>
          <div className="w-56">
            <SearchInput placeholder="Search..." />
          </div>
        </div>
      </div>
    </Section>
  );
}
