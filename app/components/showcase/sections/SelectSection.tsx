"use client";

import { useState } from "react";
import { Select, SearchableDropdown, Section } from "@/app/components/ui";

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
];

export function SelectSection() {
  const [searchableValue, setSearchableValue] = useState("");
  return (
    <Section
      title="Select & Searchable Dropdown"
      description="Native select and searchable dropdown with filter-by-typing."
    >
      <div className="flex flex-wrap items-end gap-6 min-w-0">
        <div className="w-48 min-w-0">
          <Select
            label="Choose"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
            placeholder="Select..."
          />
        </div>
        <div className="w-64 min-w-0">
          <SearchableDropdown
            label="Country"
            options={countryOptions}
            value={searchableValue}
            onChange={setSearchableValue}
            placeholder="Select country..."
            searchPlaceholder="Search countries..."
          />
        </div>
      </div>
    </Section>
  );
}
