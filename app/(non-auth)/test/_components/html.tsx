"use client";

import { Quote } from "@/components/tiptap-node/quote-node";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const CustomHtml = ({ html }: { html: string }) => {
  console.log("Input HTML:", html); // 입력 HTML 확인

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        class: "tiptap ProseMirror", // 클래스 추가
      },
    },
    extensions: [
      StarterKit.configure({
        blockquote: false, // 기본 blockquote 비활성화
      }),
      Quote,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
    ],
    content: html,
    editable: false,
  });

  if (!editor) return null;

  // console.log("Editor HTML:", editor.getHTML()); // 에디터가 생성한 HTML 확인

  return (
    <div className="tiptap ProseMirror">
      <EditorContent editor={editor} />
    </div>
  );
};

export default CustomHtml;
