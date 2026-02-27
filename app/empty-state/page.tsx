"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { EmptyStateSection } from "@/app/components/showcase/sections/EmptyStateSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { EmptyState } from "@/app/components/ui";
import { Inbox } from "lucide-react";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<EmptyState
  icon={<Inbox className="w-7 h-7" />}
  title="No items yet"
  description="Add your first item."
  actionLabel="Add item"
  onAction={() => {}}
/>`,
    language: "tsx",
  },
];

export default function EmptyStatePage() {
  return (
    <DocPageLayout>
      <EmptyStateSection />
      <Divider />
      <HowToUseSection
        description="Import EmptyState and pass icon, title, description, and optional action. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
