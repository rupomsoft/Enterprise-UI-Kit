"use client";

import { Card, ContextMenu, Section } from "@/app/components/ui";
import { FileText, FolderOpen } from "lucide-react";

export function ContextMenuSection() {
  return (
    <Section
      title="ContextMenu"
      description="Right-click to open a context menu. Use for list items, cards, or any area that needs secondary actions."
      block
    >
      <div className="flex flex-wrap items-center gap-4 min-w-0">
        <ContextMenu
          items={[
            { label: "Copy", onClick: () => console.log("Copy") },
            { label: "Rename", onClick: () => console.log("Rename") },
            { label: "Delete", variant: "danger", onClick: () => console.log("Delete") },
          ]}
        >
          <Card className="cursor-context-menu select-none w-48 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Right-click this card</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Context menu will open</p>
          </Card>
        </ContextMenu>

        <ContextMenu
          items={[
            { label: "Open", onClick: () => {} },
            { label: "Open with...", onClick: () => {} },
            { label: "Copy path", onClick: () => {} },
            { label: "Delete", variant: "danger", onClick: () => {} },
          ]}
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-[8px] border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 cursor-context-menu select-none min-w-0 max-w-xs">
            <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">document.pdf</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2.4 MB</p>
            </div>
          </div>
        </ContextMenu>

        <ContextMenu
          items={[
            { label: "New file", onClick: () => {} },
            { label: "New folder", onClick: () => {} },
            { label: "Paste", onClick: () => {}, disabled: true },
            { label: "Delete", variant: "danger", onClick: () => {} },
          ]}
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 cursor-context-menu select-none min-w-0 max-w-xs">
            <FolderOpen className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Projects</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Folder</p>
            </div>
          </div>
        </ContextMenu>

        <ContextMenu
          items={[
            { label: "Copy", onClick: () => {} },
            { label: "Cut", onClick: () => {} },
            { label: "Paste", onClick: () => {} },
          ]}
        >
          <div className="px-4 py-3 rounded-[8px] bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 cursor-context-menu select-none">
            <p className="text-sm text-gray-700 dark:text-gray-300">Right-click anywhere in this block</p>
          </div>
        </ContextMenu>
      </div>
    </Section>
  );
}
