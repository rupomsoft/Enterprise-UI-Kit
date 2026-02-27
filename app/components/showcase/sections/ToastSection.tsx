"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button, Toast } from "@/app/components/ui";
import type { ToastPosition } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

const POSITIONS: ToastPosition[] = [
  "bottom-center",
  "bottom-left",
  "bottom-right",
  "top-left",
  "top-center",
  "top-right",
];

function positionLabel(p: ToastPosition): string {
  return p.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

export function ToastSection() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<ToastPosition>("bottom-right");

  const handleOpen = (pos: ToastPosition) => {
    setPosition(pos);
    setOpen(true);
  };

  return (
    <Section title="Toast" description="Optional icon; position prop sets placement (style). Click a button to show toast at that position.">
      <div className="flex flex-wrap gap-2">
        {POSITIONS.map((pos) => (
          <Button key={pos} variant="secondary" onClick={() => handleOpen(pos)}>
            {positionLabel(pos)}
          </Button>
        ))}
      </div>
      <Toast
        open={open}
        onClose={() => setOpen(false)}
        title="Toast title"
        description="Optional description text."
        position={position}
        icon={<CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />}
        iconPosition="start"
        iconClassName="shrink-0 pt-0.5 p-1 rounded-full bg-green-100 dark:bg-green-900/30"
      />
    </Section>
  );
}
