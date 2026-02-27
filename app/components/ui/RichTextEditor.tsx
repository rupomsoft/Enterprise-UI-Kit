"use client";

import { useEffect, useRef, useMemo, useCallback, memo, type ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
  Heading1,
  Heading2,
  Heading3,
  SquareCode,
} from "lucide-react";
import { labelBase } from "./styles";

const toolbarBtnClass =
  "p-2 rounded-[6px] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors";

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  "aria-label": string;
  children: ReactNode;
}

const ToolbarButton = memo(function ToolbarButton({
  onClick,
  active,
  disabled: btnDisabled,
  "aria-label": ariaLabel,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={btnDisabled}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`${toolbarBtnClass} ${active ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : ""}`}
    >
      {children}
    </button>
  );
});

export interface RichTextEditorProps {
  /** Optional label above the editor */
  label?: string;
  /** Placeholder when editor is empty */
  placeholder?: string;
  /** Initial or controlled content (HTML string) */
  value?: string;
  /** Called when content changes; receives HTML string */
  onChange?: (html: string) => void;
  /** Minimum height of the editable area (e.g. "120px" or "8rem") */
  minHeight?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function RichTextEditor({
  label,
  placeholder = "Write something…",
  value,
  onChange,
  minHeight = "120px",
  disabled = false,
  className = "",
  id: idProp,
}: RichTextEditorProps) {
  const isControlled = value !== undefined;
  const initialContentRef = useRef(value ?? "");

  const extensions = useMemo(
    () => [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Placeholder.configure({ placeholder }),
    ],
    [placeholder]
  );

  const onUpdateCb = useCallback(
    (payload: { editor: { getHTML: () => string } }) => {
      onChange?.(payload.editor.getHTML());
    },
    [onChange]
  );

  const editorProps = useMemo(
    () => ({
      attributes: {
        class: "min-w-0 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100",
      },
    }),
    []
  );

  const editor = useEditor({
    extensions,
    content: isControlled ? value : initialContentRef.current,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: onUpdateCb,
    editorProps,
  });

  const inputId =
    idProp ?? (label ? `richtext-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    if (!editor || !isControlled) return;
    const current = editor.getHTML();
    if (value !== current) editor.commands.setContent(value ?? "", { emitUpdate: false });
  }, [editor, isControlled, value]);

  if (!editor) return null;

  return (
    <div className={`space-y-1.5 min-w-0 ${className}`.trim()}>
      {label && inputId && (
        <label htmlFor={inputId} className={labelBase}>
          {label}
        </label>
      )}
      <div
        id={inputId}
        className="rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-gray-200 dark:focus-within:ring-gray-600 focus-within:border-transparent"
      >
        <div className="flex flex-wrap items-center gap-0.5 p-1 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            aria-label="Bold"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            aria-label="Italic"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            aria-label="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            aria-label="Inline code"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-0.5" aria-hidden />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive("heading", { level: 1 })}
            aria-label="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            aria-label="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            aria-label="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-0.5" aria-hidden />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            aria-label="Bullet list"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            aria-label="Ordered list"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            aria-label="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            aria-label="Code block"
          >
            <SquareCode className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            aria-label="Horizontal rule"
          >
            <Minus className="w-4 h-4" />
          </ToolbarButton>
        </div>
        <div style={{ minHeight }}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
