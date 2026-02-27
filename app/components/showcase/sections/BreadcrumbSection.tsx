"use client";

import { Breadcrumb } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function BreadcrumbSection() {
  return (
    <Section title="Breadcrumb">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Current" },
        ]}
      />
    </Section>
  );
}
