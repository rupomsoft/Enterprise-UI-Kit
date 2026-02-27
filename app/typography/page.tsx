"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { TypographySection } from "@/app/components/showcase/sections/TypographySection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Typography } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Variants",
    code: `<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="body1">Body text.</Typography>
<Typography variant="body2">Body small.</Typography>
<Typography variant="caption">Caption text.</Typography>
<Typography variant="label">Label text.</Typography>`,
    language: "tsx",
  },
];

export default function TypographyPage() {
  return (
    <DocPageLayout>
      <TypographySection />
      <Divider />
      <HowToUseSection
        description="Import Typography and use variant: h1–h4, body1, body2, caption, label. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
