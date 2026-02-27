"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { ButtonSection } from "@/app/components/showcase/sections/ButtonSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: 'import { Button } from "@/app/components/ui";',
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `export function Example() {
  return <Button>Primary</Button>;
}`,
    language: "tsx",
  },
  {
    label: "Variants",
    code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="primary-outline">Primary outline</Button>
<Button variant="secondary-outline">Secondary outline</Button>
<Button variant="danger-outline">Danger outline</Button>`,
    language: "tsx",
    title: "Button variants",
  },
];

export default function ButtonPage() {
  return (
    <DocPageLayout>
      <ButtonSection />
      <Divider />
      <HowToUseSection
        description="Import the Button component and use it with optional variant. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
