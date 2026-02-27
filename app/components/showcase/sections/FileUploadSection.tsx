"use client";

import { FileUpload } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function FileUploadSection() {
  return (
    <Section title="FileUpload">
      <div className="w-64">
        <FileUpload label="Upload" hint="Drag and drop or click" />
      </div>
    </Section>
  );
}
