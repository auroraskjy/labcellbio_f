"use client";

// --- Tiptap Node ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-node/quote-node/quote-node.scss";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import { ImageNode } from "@/components/tiptap-node/image-node/image-node-extension"; // 기본 Image 대신 커스텀 ImageNode 사용
import { Quote } from "@/components/tiptap-node/quote-node";
import { Highlight } from "@tiptap/extension-highlight";
// import { Image } from "@tiptap/extension-image"; // 이 줄 제거
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
      ImageNode, // 커스텀 ImageNode 사용
      Typography,
      Superscript,
      Subscript,
      Selection,
    ],
    content: html,
    editable: false,
  });

  if (!editor) return null;

  return (
    <div className="tiptap ProseMirror">
      <EditorContent editor={editor} />
    </div>
  );
};

export default CustomHtml;
