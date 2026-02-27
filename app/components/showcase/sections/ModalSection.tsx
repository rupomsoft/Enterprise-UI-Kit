"use client";

import { useState } from "react";
import { Button, Modal, Section } from "@/app/components/ui";
import type { ModalSize } from "@/app/components/ui";

const SIZES: ModalSize[] = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "full-screen"];

export function ModalSection() {
  const [openSize, setOpenSize] = useState<ModalSize | null>(null);
  return (
    <Section
      title="Modal"
      description="Modal with size options: sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, full-screen."
    >
      <div className="flex flex-wrap items-center gap-2">
        {SIZES.map((size) => (
          <Button key={size} onClick={() => setOpenSize(size)}>
            Open {size === "full-screen" ? "full-screen" : size}
          </Button>
        ))}
      </div>
      {openSize != null && (
        <Modal
          open={true}
          onClose={() => setOpenSize(null)}
          title={`Modal (${openSize === "full-screen" ? "full-screen" : openSize})`}
          size={openSize}
        >
          <p>
            This is the {openSize === "full-screen" ? "full-screen" : openSize} modal. Close with the button or overlay.
          </p>
        </Modal>
      )}
    </Section>
  );
}
