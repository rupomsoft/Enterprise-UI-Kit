"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { BreadcrumbSection } from "@/app/components/showcase/sections/BreadcrumbSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: `import { Breadcrumb } from "@/app/components/ui";`, language: "tsx" },
  {
    label: "Basic usage",
    code: `<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Current" },
  ]}
/>`,
    language: "tsx",
  },
];

export default function BreadcrumbPage() {
  return (
    <DocPageLayout>
      <BreadcrumbSection />
      <Divider />
      <HowToUseSection
        description="Import Breadcrumb and pass an array of items with label and optional href. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
