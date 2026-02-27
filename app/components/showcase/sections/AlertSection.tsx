"use client";

import { Alert } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function AlertSection() {
  return (
    <Section title="Alert" description="Success, warning, error." block>
      <div className="max-w-md space-y-2">
        <Alert variant="success" title="Success" description="Done." />
        <Alert variant="warning" title="Warning" description="Review." />
        <Alert variant="error" title="Error" description="Failed." />
      </div>
    </Section>
  );
}
