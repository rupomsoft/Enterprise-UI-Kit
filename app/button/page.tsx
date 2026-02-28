"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { ButtonSection } from "@/app/components/showcase/sections/ButtonSection";
import { ButtonGroupSection } from "@/app/components/showcase/sections/ButtonGroupSection";
import { ToggleButtonSection } from "@/app/components/showcase/sections/ToggleButtonSection";
import { LinkSection } from "@/app/components/showcase/sections/LinkSection";
import { IconButtonIconBoxSection } from "@/app/components/showcase/sections/IconButtonIconBoxSection";
import { Divider } from "@/app/components/ui";

const BUTTON_ENTRIES = [
  { label: "Import", code: 'import { Button } from "@/app/components/ui";', language: "tsx" },
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

const BUTTON_GROUP_ENTRIES = [
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

const TOGGLE_BUTTON_ENTRIES = [
  { label: "Import", code: 'import { ToggleButton } from "@/app/components/ui";', language: "tsx" },
  {
    label: "Basic usage",
    code: `<ToggleButton
  pressed={pressed}
  onPressedChange={setPressed}
/>`,
    language: "tsx",
  },
];

const LINK_ENTRIES = [
  { label: "Import", code: 'import { Link } from "@/app/components/ui";', language: "tsx" },
  {
    label: "Basic usage",
    code: `<Link href="/">Home</Link>
<Link href="/dashboard" underline>Dashboard (underline)</Link>`,
    language: "tsx",
  },
];

const ICON_BUTTON_ENTRIES = [
  {
    label: "Import",
    code: `import { IconButton, IconBox } from "@/app/components/ui";
import { Settings, Inbox } from "lucide-react";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<IconButton icon={<Settings className="w-5 h-5" />} aria-label="Settings" />

<IconBox icon={<Inbox className="w-5 h-5" />} size="sm" />
<IconBox icon={<Inbox className="w-5 h-5" />} rounded="full" />`,
    language: "tsx",
  },
];

export default function ButtonPage() {
  return (
    <DocPageLayout>
      <ButtonSection />
      <Divider />
      <HowToUseSection
        description="Import the Button component and use it with optional variant. Copy the examples below."
        entries={BUTTON_ENTRIES}
      />

      <Divider />
      <ButtonGroupSection />
      <Divider />
      <HowToUseSection
        description="Import ButtonGroup and pass options, value, and onChange. Copy the examples below."
        entries={BUTTON_GROUP_ENTRIES}
      />

      <Divider />
      <ToggleButtonSection />
      <Divider />
      <HowToUseSection
        description="Import ToggleButton. Pass pressed and onPressedChange. Copy the examples below."
        entries={TOGGLE_BUTTON_ENTRIES}
      />

      <Divider />
      <LinkSection />
      <Divider />
      <HowToUseSection
        description="Import Link and use href with optional underline. Copy the examples below."
        entries={LINK_ENTRIES}
      />

      <Divider />
      <IconButtonIconBoxSection />
      <Divider />
      <HowToUseSection
        description="Use IconButton for actionable icons and IconBox for display. Copy the examples below."
        entries={ICON_BUTTON_ENTRIES}
      />
    </DocPageLayout>
  );
}
