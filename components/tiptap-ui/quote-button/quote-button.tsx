import { QuoteIcon } from "@/components/tiptap-icons/quote-icon";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Editor } from "@tiptap/core";
import React from "react";
import { useQuote } from "./use-quote";

interface QuoteButtonProps {
  editor?: Editor;
  onToggled?: () => void;
}

export const QuoteButton = React.forwardRef<
  HTMLButtonElement,
  QuoteButtonProps
>(({ editor: propEditor, onToggled }, ref) => {
  const { isActive, handleQuote, canToggle, label, shortcutKeys } = useQuote({
    editor: propEditor,
    onToggled,
  });

  return (
    <Button
      type="button"
      disabled={!canToggle}
      data-style="ghost"
      data-active-state={isActive ? "on" : "off"}
      data-disabled={!canToggle}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={isActive}
      tooltip={`${label} (${shortcutKeys})`}
      onClick={handleQuote}
      ref={ref}
    >
      <QuoteIcon className="tiptap-button-icon" aria-hidden="true" />
    </Button>
  );
});

QuoteButton.displayName = "QuoteButton";
