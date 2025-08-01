import { QuoteAltLeftIcon } from "@/components/tiptap-icons/quote-alt-left-icon";
import { QuoteAltRightIcon } from "@/components/tiptap-icons/quote-alt-right-icon";
import { TrashIcon } from "@/components/tiptap-icons/trash-icon";
import { NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";

interface QuoteNodeViewProps {
  node: any;
  updateAttributes: (attrs: Record<string, any>) => void;
  deleteNode: () => void;
}

export const QuoteNodeView: React.FC<QuoteNodeViewProps> = ({
  node,
  updateAttributes,
  deleteNode,
}) => {
  const [isNodeSelected, setIsNodeSelected] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ content: e.target.value });
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttributes({ source: e.target.value });
  };

  // 노드가 새로 생성되었을 때 첫 번째 input에 포커스
  useEffect(() => {
    if (!node.attrs.content && !node.attrs.source) {
      const timer = setTimeout(() => {
        quoteTextRef.current?.focus();
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [node.attrs.content, node.attrs.source]); // 의존성 추가

  // 노드 선택 시 삭제 버튼 표시
  useEffect(() => {
    setShowDeleteButton(isNodeSelected);
  }, [isNodeSelected]);

  // 테두리 영역 클릭 시 노드 선택
  const handleBorderClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === e.currentTarget) {
      setIsNodeSelected(true);

      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(containerRef.current!);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // input 필드 포커스/클릭 처리
  const handleInputFocus = () => {
    setIsNodeSelected(false);
    setShowDeleteButton(false);
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNodeSelected(false);
    setShowDeleteButton(false);
    setIsInputFocused(true);
  };

  // 노드 선택 상태에서 백스페이스 키 처리
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isInputFocused) return;

    if (event.key === "Backspace" && isNodeSelected) {
      event.preventDefault();
      deleteNode();
    }
  };

  // 외부 클릭 시 노드 선택 해제
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsNodeSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NodeViewWrapper className="quote-node">
      <div
        ref={containerRef}
        className={`quote-container ${isNodeSelected ? "selected" : ""}`}
        onMouseEnter={() => setShowDeleteButton(true)}
        onMouseLeave={() => !isNodeSelected && setShowDeleteButton(false)}
        onClick={handleBorderClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        contentEditable={false}
      >
        <QuoteAltLeftIcon className="text-gray-300" />

        <div className="quote-content">
          <input
            ref={quoteTextRef}
            className="quote-text"
            type="text"
            value={node.attrs.content || ""}
            onChange={handleContentChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onClick={handleInputClick}
            placeholder="내용을 입력하세요."
          />

          <input
            className="quote-source"
            type="text"
            value={node.attrs.source || ""}
            onChange={handleSourceChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onClick={handleInputClick}
            placeholder="출처 입력"
          />
        </div>

        <QuoteAltRightIcon className="text-gray-300" />

        {showDeleteButton && (
          <div className="quote-delete-tooltip">
            <button
              className="quote-delete-button"
              onClick={deleteNode}
              title="인용구 삭제"
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
