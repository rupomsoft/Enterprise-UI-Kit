"use client";

import { type ReactNode } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
}

export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
}: AlertDialogProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const footer: ReactNode = (
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
      <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">
        {cancelLabel}
      </Button>
      <Button
        variant={variant === "danger" ? "danger" : "primary"}
        onClick={handleConfirm}
        className="w-full sm:w-auto"
      >
        {confirmLabel}
      </Button>
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title={title} footer={footer}>
      {description ?? ""}
    </Modal>
  );
}
