"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { BadgeSection } from "@/app/components/showcase/sections/BadgeSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: 'import { Badge } from "@/app/components/ui";',
    language: "tsx",
  },
  {
    label: "Variants",
    code: `<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="success-outline">Success outline</Badge>`,
    language: "tsx",
  },
];

export default function BadgePage() {
  return (
    <DocPageLayout>
      <BadgeSection />
      <Divider />
      <HowToUseSection
        description="Import Badge and use with optional variant. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
