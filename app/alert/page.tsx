"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { AlertSection } from "@/app/components/showcase/sections/AlertSection";
import { AlertDialogSection } from "@/app/components/showcase/sections/AlertDialogSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: 'import { Alert, AlertDialog } from "@/app/components/ui";', language: "tsx" },
  {
    label: "Alert variants",
    code: `<Alert variant="success" title="Success" description="Done." />
<Alert variant="warning" title="Warning" description="Review." />
<Alert variant="error" title="Error" description="Failed." />`,
    language: "tsx",
  },
  {
    label: "Alert Dialog",
    code: `<AlertDialog
  open={open}
  onClose={() => setOpen(false)}
  onConfirm={() => setOpen(false)}
  title="Confirm action"
  description="Are you sure?"
  confirmLabel="Confirm"
  cancelLabel="Cancel"
/>`,
    language: "tsx",
  },
];

export default function AlertPage() {
  return (
    <DocPageLayout>
      <AlertSection />
      <AlertDialogSection />
      <Divider />
      <HowToUseSection
        description="Use Alert for inline messages and AlertDialog for confirmations. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
