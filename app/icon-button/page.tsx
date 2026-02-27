"use client";

import { DashboardLayout } from "@/app/components/common/DashboardLayout";
import { IconButtonIconBoxSection } from "@/app/components/showcase/sections/IconButtonIconBoxSection";
import { CodePad, Divider, Section } from "@/app/components/ui";

const importCode = `import { IconButton, IconBox } from "@/app/components/ui";
import { Settings, Inbox } from "lucide-react";`;

const usageCode = `<IconButton icon={<Settings className="w-5 h-5" />} aria-label="Settings" />

<IconBox icon={<Inbox className="w-5 h-5" />} size="sm" />
<IconBox icon={<Inbox className="w-5 h-5" />} rounded="full" />`;

export default function IconButtonPage() {
  return (
    <DashboardLayout>
      <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <IconButtonIconBoxSection />
        <Divider />
        <Section
          title="How to use"
          description="Use IconButton for actionable icons and IconBox for display. Copy the examples below."
          block
        >
          <div className="space-y-4 w-full min-w-0 max-w-2xl">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">1. Import</p>
              <CodePad code={importCode} language="tsx" />
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">2. Basic usage</p>
              <CodePad code={usageCode} language="tsx" />
            </div>
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
}
