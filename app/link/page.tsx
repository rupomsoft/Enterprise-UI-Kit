"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { LinkSection } from "@/app/components/showcase/sections/LinkSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: `import { Link } from "@/app/components/ui";`, language: "tsx" },
  {
    label: "Basic usage",
    code: `<Link href="/">Home</Link>
<Link href="/dashboard" underline>Dashboard (underline)</Link>`,
    language: "tsx",
  },
];

export default function LinkPage() {
  return (
    <DocPageLayout>
      <LinkSection />
      <Divider />
      <HowToUseSection
        description="Import Link and use href with optional underline. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
