"use client";

import { useState } from "react";
import { RichTextEditor, Section } from "@/app/components/ui";

export function RichTextEditorSection() {
  const [html, setHtml] = useState("");
  return (
    <Section
      title="Rich Text Editor"
      description="Tiptap-based editor with bold, italic, strike, code, headings, lists, blockquote, code block, and horizontal rule. No image or file upload."
      block
    >
      <div className="w-full min-w-0 max-w-2xl">
        <RichTextEditor
          label="Content"
          placeholder="Write something…"
          value={html}
          onChange={setHtml}
          minHeight="160px"
        />
        {html && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            HTML length: {html.length} chars
          </p>
        )}
      </div>
    </Section>
  );
}
