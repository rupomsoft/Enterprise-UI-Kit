"use client";

import { Link } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function LinkSection() {
  return (
    <Section title="Link">
      <Link href="/">Home</Link>
      <Link href="/dashboard" underline>Dashboard (underline)</Link>
    </Section>
  );
}
