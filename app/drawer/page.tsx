"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { DrawerSection } from "@/app/components/showcase/sections/DrawerSection";
import { Divider } from "@/app/components/ui";

const basicCode = `<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Drawer title"
  side="right"
>
  <p>Drawer content.</p>
</Drawer>`;

const allSidesCode = `// Right (default)
<Drawer open={open} onClose={() => setOpen(false)} title="Drawer" side="right">
  <p>Content.</p>
</Drawer>

// Left
<Drawer open={open} onClose={() => setOpen(false)} title="Drawer" side="left">
  <p>Content.</p>
</Drawer>

// Top
<Drawer open={open} onClose={() => setOpen(false)} title="Drawer" side="top">
  <p>Content.</p>
</Drawer>

// Bottom
<Drawer open={open} onClose={() => setOpen(false)} title="Drawer" side="bottom">
  <p>Content.</p>
</Drawer>`;

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Drawer, Button } from "@/app/components/ui";
import type { DrawerSide } from "@/app/components/ui";`,
    language: "tsx",
  },
  { label: "Basic usage", code: basicCode, language: "tsx" },
  {
    label: "All side types",
    code: allSidesCode,
    language: "tsx",
    title: "Drawer side variants",
  },
];

export default function DrawerPage() {
  return (
    <DocPageLayout>
      <DrawerSection />
      <Divider />
      <HowToUseSection
        description="Drawer side types: left, right, top, bottom. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
