"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { ModalSection } from "@/app/components/showcase/sections/ModalSection";
import { Divider } from "@/app/components/ui";

const basicCode = `<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Modal title"
  size="md"
>
  <p>Modal content.</p>
</Modal>`;

const sizesCode = `// Small
<Modal open={open} onClose={() => setOpen(false)} title="Small" size="sm">
  <p>Content.</p>
</Modal>

// Medium (default)
<Modal open={open} onClose={() => setOpen(false)} title="Medium" size="md">
  <p>Content.</p>
</Modal>

// Large
<Modal open={open} onClose={() => setOpen(false)} title="Large" size="lg">
  <p>Content.</p>
</Modal>

// Extra large
<Modal open={open} onClose={() => setOpen(false)} title="XL" size="xl">
  <p>Content.</p>
</Modal>

// 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
<Modal open={open} onClose={() => setOpen(false)} title="2xl" size="2xl">
  <p>Content.</p>
</Modal>

// Full screen
<Modal open={open} onClose={() => setOpen(false)} title="Full screen" size="full-screen">
  <p>Full screen modal content.</p>
</Modal>`;

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Modal, Button } from "@/app/components/ui";
import type { ModalSize } from "@/app/components/ui";`,
    language: "tsx",
  },
  { label: "Basic usage", code: basicCode, language: "tsx" },
  {
    label: "All size types",
    code: sizesCode,
    language: "tsx",
    title: "Modal size variants",
  },
];

export default function ModalPage() {
  return (
    <DocPageLayout>
      <ModalSection />
      <Divider />
      <HowToUseSection
        description="Modal sizes: sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, full-screen. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
