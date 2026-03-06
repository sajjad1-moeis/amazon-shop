"use client";

import React, { useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Link2,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MenuButton = ({ onClick, active, disabled, children, title }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      "h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700",
      active && "bg-gray-700 text-white"
    )}
  >
    {children}
  </Button>
);

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "محتوای وبلاگ را بنویسید...",
  className = "",
  minHeight = "min-h-[400px]",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-400 underline hover:text-blue-300" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none focus:outline-none min-h-[350px] px-4 py-3",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML() && value !== undefined) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  const handleUpdate = useCallback(() => {
    if (editor && onChange) {
      onChange(editor.getHTML());
    }
  }, [editor, onChange]);

  useEffect(() => {
    if (!editor) return;
    editor.on("update", handleUpdate);
    return () => editor.off("update", handleUpdate);
  }, [editor, handleUpdate]);

  if (!editor) {
    return (
      <div
        className={cn(
          "rounded-lg border border-gray-600 bg-gray-800 animate-pulse",
          minHeight,
          className
        )}
      />
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("آدرس لینک را وارد کنید:", previousUrl);
    if (url !== null) {
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      }
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-600 bg-gray-800 overflow-hidden",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-600 bg-gray-800/80">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="پررنگ"
        >
          <Bold className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="مورب"
        >
          <Italic className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="خط خورده"
        >
          <Strikethrough className="h-4 w-4" />
        </MenuButton>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="عنوان ۱"
        >
          <Heading1 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="عنوان ۲"
        >
          <Heading2 className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="عنوان ۳"
        >
          <Heading3 className="h-4 w-4" />
        </MenuButton>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="لیست نقطه‌ای"
        >
          <List className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="لیست شماره‌دار"
        >
          <ListOrdered className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="نقل قول"
        >
          <Quote className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="کد"
        >
          <Code className="h-4 w-4" />
        </MenuButton>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <MenuButton
          onClick={setLink}
          active={editor.isActive("link")}
          title="لینک"
        >
          <Link2 className="h-4 w-4" />
        </MenuButton>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="بازگردانی"
        >
          <Undo className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="جلو بردن"
        >
          <Redo className="h-4 w-4" />
        </MenuButton>
      </div>
      <div className="bg-gray-700/50 text-white rich-text-editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
