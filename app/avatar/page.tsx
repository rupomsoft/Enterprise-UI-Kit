"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { AvatarSection } from "@/app/components/showcase/sections/AvatarSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: 'import { Avatar } from "@/app/components/ui";', language: "tsx" },
  {
    label: "Sizes",
    code: `<Avatar size="sm" bgClass="bg-emerald-500 text-white">JD</Avatar>
<Avatar size="md" bgClass="bg-blue-500 text-white">AB</Avatar>
<Avatar size="lg" bgClass="bg-amber-500 text-white">CD</Avatar>`,
    language: "tsx",
  },
];

export default function AvatarPage() {
  return (
    <DocPageLayout>
      <AvatarSection />
      <Divider />
      <HowToUseSection
        description="Import Avatar and use size (sm, md, lg) and bgClass for styling. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
