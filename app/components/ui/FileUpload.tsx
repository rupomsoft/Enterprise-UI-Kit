"use client";

import { type ReactNode } from "react";
import { labelBase } from "./styles";

export interface FileUploadProps {
  label?: string;
  hint?: ReactNode;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
}

export function FileUpload({
  label,
  hint = "Drag and drop or click to upload",
  accept,
  multiple,
  onChange,
}: FileUploadProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className={labelBase}>{label}</label>}
      <label className="flex flex-col items-center justify-center w-full rounded-[8px] border border-gray-200 dark:border-gray-600 border-dashed bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer py-6 px-4">
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {hint}
        </span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => onChange?.(e.target.files ?? null)}
        />
      </label>
    </div>
  );
}
