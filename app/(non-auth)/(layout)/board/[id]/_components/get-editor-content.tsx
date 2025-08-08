"use client";

// ===================================================================
// CSS 스타일 임포트 (CSS Styles Import)
// ===================================================================
// 설명: Tiptap 에디터의 각 노드별 스타일링을 위한 SCSS 파일들
// 목적: 에디터 콘텐츠의 시각적 표현을 정의
// ===================================================================

// --- 커스텀 Tiptap 노드 스타일 (Custom Tiptap Node Styles) ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"; // 인용구(블록쿼트) 스타일
import "@/components/tiptap-node/code-block-node/code-block-node.scss"; // 코드 블록 스타일
import "@/components/tiptap-node/heading-node/heading-node.scss"; // 제목(헤딩) 스타일 (H1-H6)
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"; // 수평선 스타일
import "@/components/tiptap-node/image-node/image-node.scss"; // 이미지 노드 스타일
import "@/components/tiptap-node/list-node/list-node.scss"; // 리스트(순서/비순서) 스타일
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"; // 문단(단락) 스타일
import "@/components/tiptap-node/quote-node/quote-node.scss"; // 커스텀 인용 노드 스타일

// --- 에디터 템플릿 스타일 (Editor Template Styles) ---
import "@/components/tiptap-templates/simple/simple-editor.scss"; // 심플 에디터 전체 스타일

// ===================================================================
// 커스텀 확장 기능 임포트 (Custom Extensions Import)
// ===================================================================
// 설명: 프로젝트에서 직접 구현한 Tiptap 확장 기능들
// 목적: 기본 Tiptap 기능을 프로젝트 요구사항에 맞게 확장
// ===================================================================

import { ImageNode } from "@/components/tiptap-node/image-node/image-node-extension"; // 커스텀 이미지 노드 확장
import { Quote } from "@/components/tiptap-node/quote-node"; // 커스텀 인용구 노드

// ===================================================================
// 공식 Tiptap 확장 기능 임포트 (Official Tiptap Extensions Import)
// ===================================================================
// 설명: @tiptap에서 제공하는 공식 확장 기능들
// 목적: 에디터의 텍스트 서식 및 고급 기능 제공
// ===================================================================

// --- 텍스트 서식 확장 (Text Formatting Extensions) ---
import { Highlight } from "@tiptap/extension-highlight"; // 텍스트 하이라이트(형광펜) 기능
import { Subscript } from "@tiptap/extension-subscript"; // 아래 첨자 (H₂O)
import { Superscript } from "@tiptap/extension-superscript"; // 위 첨자 (x²)

// --- 리스트 관련 확장 (List Extensions) ---
import { TaskItem, TaskList } from "@tiptap/extension-list"; // 체크박스 할 일 목록

// --- 텍스트 정렬 확장 (Text Alignment Extension) ---
import { TextAlign } from "@tiptap/extension-text-align"; // 텍스트 정렬 (좌/중앙/우/양쪽)

// --- 타이포그래피 확장 (Typography Extension) ---
import { Typography } from "@tiptap/extension-typography"; // 스마트 따옴표, 대시 등 타이포그래피

// --- 기타 확장 (Other Extensions) ---
import { Selection } from "@tiptap/extensions"; // 텍스트 선택 관련 유틸리티

// ===================================================================
// Tiptap 핵심 라이브러리 임포트 (Tiptap Core Library Import)
// ===================================================================
// 설명: Tiptap 에디터의 핵심 기능과 기본 확장팩
// 목적: 에디터 초기화 및 렌더링을 위한 필수 라이브러리
// ===================================================================

// --- React 통합 (React Integration) ---
import { EditorContent, useEditor } from "@tiptap/react"; // React용 에디터 컴포넌트 및 훅

// --- 기본 확장팩 (Starter Kit) ---
import StarterKit from "@tiptap/starter-kit"; // 기본 에디터 기능 모음 (문단, 볼드, 이탤릭, 리스트 등)

export default function GetEditorContent({ html }: { html: string }) {
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
}
