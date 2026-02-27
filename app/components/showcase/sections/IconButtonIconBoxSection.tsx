"use client";

import { Settings, Inbox } from "lucide-react";
import { IconButton, IconBox } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function IconButtonIconBoxSection() {
  return (
    <Section title="IconButton & IconBox">
      <IconButton icon={<Settings className="w-5 h-5" />} aria-label="Settings" />
      <IconBox icon={<Inbox className="w-5 h-5" />} size="sm" />
      <IconBox icon={<Inbox className="w-5 h-5" />} rounded="full" />
    </Section>
  );
}
