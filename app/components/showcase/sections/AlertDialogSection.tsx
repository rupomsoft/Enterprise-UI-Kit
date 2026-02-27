"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function AlertDialogSection() {
  const [open, setOpen] = useState(false);
  return (
    <Section title="Alert Dialog" description="Reusable confirmation dialog.">
      <Button onClick={() => setOpen(true)}>Open Alert Dialog</Button>
      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Confirm action"
        description="Are you sure you want to continue?"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
      />
    </Section>
  );
}
