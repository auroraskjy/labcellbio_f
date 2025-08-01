import { QuoteIcon } from "@/components/tiptap-icons/quote-icon";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import React from "react";

interface QuoteButtonProps {
  editor?: any;
}

export const QuoteButton = React.forwardRef<
  HTMLButtonElement,
  QuoteButtonProps
>(({ editor: propEditor }, ref) => {
  const { editor } = useTiptapEditor(propEditor);

  const handleClick = () => {
    if (!editor) return;
    editor.chain().focus().setQuote().run();
  };

  // quote node 내부에 있는지 확인
  const isActive = React.useMemo(() => {
    if (!editor) return false;

    const { state } = editor;
    const { selection } = state;
    const { $from } = selection;

    // 현재 위치의 노드가 quote 노드인지 확인
    return $from.parent.type.name === "quote";
  }, [editor]);

  const canToggle = editor?.can().setQuote?.() || false;

  return (
    <Button
      type="button"
      disabled={!canToggle}
      data-style="ghost"
      data-active-state={isActive ? "on" : "off"}
      data-disabled={!canToggle}
      role="button"
      tabIndex={-1}
      aria-label="Quote"
      aria-pressed={isActive}
      tooltip="Quote"
      onClick={handleClick}
      ref={ref}
    >
      <QuoteIcon className="tiptap-button-icon" />
    </Button>
  );
});

QuoteButton.displayName = "QuoteButton";
