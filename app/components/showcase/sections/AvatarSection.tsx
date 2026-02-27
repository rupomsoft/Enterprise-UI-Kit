"use client";

import { Avatar } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function AvatarSection() {
  return (
    <Section title="Avatar" description="Sizes: sm, md, lg.">
      <Avatar size="sm" bgClass="bg-emerald-500 text-white">JD</Avatar>
      <Avatar size="md" bgClass="bg-blue-500 text-white">AB</Avatar>
      <Avatar size="lg" bgClass="bg-amber-500 text-white">CD</Avatar>
    </Section>
  );
}
