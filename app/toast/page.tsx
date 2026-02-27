"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { ToastSection } from "@/app/components/showcase/sections/ToastSection";
import { Divider } from "@/app/components/ui";

const basicCode = `<Toast
  open={open}
  onClose={() => setOpen(false)}
  title="Toast title"
  description="Optional description."
  position="bottom-right"
  icon={<CheckCircle2 className="w-5 h-5" />}
/>`;

const allPositionsCode = `// Bottom right (default)
<Toast open={open} onClose={() => setOpen(false)} title="Toast" position="bottom-right" />

// Bottom center
<Toast open={open} onClose={() => setOpen(false)} title="Toast" position="bottom-center" />

// Bottom left
<Toast open={open} onClose={() => setOpen(false)} title="Toast" position="bottom-left" />

// Top left
<Toast open={open} onClose={() => setOpen(false)} title="Toast" position="top-left" />

// Top center
<Toast open={open} onClose={() => setOpen(false)} title="Toast" position="top-center" />

// Top right
<Toast open={open} onClose={() => setOpen(false)} title="Toast" position="top-right" />`;

const withIconCode = `<Toast
  open={open}
  onClose={() => setOpen(false)}
  title="Success"
  description="Your changes were saved."
  position="bottom-right"
  icon={<CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />}
  iconPosition="start"
  iconClassName="shrink-0 pt-0.5 p-1 rounded-full bg-green-100 dark:bg-green-900/30"
/>`;

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Toast } from "@/app/components/ui";
import type { ToastPosition } from "@/app/components/ui";
import { CheckCircle2 } from "lucide-react";`,
    language: "tsx",
  },
  { label: "Basic usage", code: basicCode, language: "tsx" },
  {
    label: "All position types",
    code: allPositionsCode,
    language: "tsx",
    title: "Toast position variants",
  },
  {
    label: "With icon (iconPosition, iconClassName)",
    code: withIconCode,
    language: "tsx",
  },
];

export default function ToastPage() {
  return (
    <DocPageLayout>
      <ToastSection />
      <Divider />
      <HowToUseSection
        description="Toast position types: bottom-center, bottom-left, bottom-right, top-left, top-center, top-right. Optional icon, iconPosition, iconClassName. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
