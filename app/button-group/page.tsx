"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { ButtonGroupSection } from "@/app/components/showcase/sections/ButtonGroupSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: 'import { ButtonGroup } from "@/app/components/ui";', language: "tsx" },
  {
    label: "Basic usage",
    code: `const options = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

<ButtonGroup
  options={options}
  value={value}
  onChange={setValue}
  variant="secondary"
/>`,
    language: "tsx",
  },
  {
    label: "All variants",
    code: `// Primary
<ButtonGroup options={options} value={value} onChange={setValue} variant="primary" />
// Secondary
<ButtonGroup options={options} value={value} onChange={setValue} variant="secondary" />
// Danger
<ButtonGroup options={options} value={value} onChange={setValue} variant="danger" />
// Primary outline
<ButtonGroup options={options} value={value} onChange={setValue} variant="primary-outline" />
// Secondary outline
<ButtonGroup options={options} value={value} onChange={setValue} variant="secondary-outline" />
// Danger outline
<ButtonGroup options={options} value={value} onChange={setValue} variant="danger-outline" />`,
    language: "tsx",
    title: "ButtonGroup variants",
  },
];

export default function ButtonGroupPage() {
  return (
    <DocPageLayout>
      <ButtonGroupSection />
      <Divider />
      <HowToUseSection
        description="Import ButtonGroup and pass options, value, and onChange. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
