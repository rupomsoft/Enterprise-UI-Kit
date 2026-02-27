"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { TagSection } from "@/app/components/showcase/sections/TagSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: `import { Tag } from "@/app/components/ui";`, language: "tsx" },
  {
    label: "Variants",
    code: `<Tag>Default</Tag>
<Tag variant="filled">Filled</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>
<Tag variant="neutral">Neutral</Tag>`,
    language: "tsx",
  },
];

export default function TagPage() {
  return (
    <DocPageLayout>
      <TagSection />
      <Divider />
      <HowToUseSection
        description="Import Tag and use with optional variant. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
