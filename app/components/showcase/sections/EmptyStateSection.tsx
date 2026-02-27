"use client";

import { Inbox } from "lucide-react";
import { EmptyState } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function EmptyStateSection() {
  return (
    <Section title="EmptyState">
      <div className="max-w-7xl w-full mx-auto flex justify-center items-center min-h-[280px]">
        <div className="w-90">
          <EmptyState
            icon={<Inbox className="w-7 h-7" />}
            title="No items yet"
            description="Add your first item."
            actionLabel="Add item"
            onAction={() => {}}
          />
        </div>
      </div>
    </Section>
  );
}
