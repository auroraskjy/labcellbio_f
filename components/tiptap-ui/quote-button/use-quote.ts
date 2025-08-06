import { useIsMobile } from "@/hooks/use-mobile";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { Editor } from "@tiptap/core";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";

export interface UseQuoteConfig {
  editor?: Editor | null;
  onToggled?: () => void;
}

export const QUOTE_SHORTCUT_KEY = "mod+shift+q";

export function useQuote(config: UseQuoteConfig) {
  const { editor: providedEditor, onToggled } = config;
  const { editor } = useTiptapEditor(providedEditor);
  const isMobile = useIsMobile();

  const isActive = React.useMemo(() => {
    if (!editor?.state) return false;
    const { selection } = editor.state;
    const { $from } = selection;
    return $from.parent.type.name === "quote";
  }, [editor]);

  const canToggle = React.useMemo(() => {
    return editor?.can().setQuote() ?? false;
  }, [editor]);

  const handleQuote = React.useCallback(() => {
    if (!editor) return false;

    const success = editor.chain().focus().setQuote().run();
    if (success) {
      onToggled?.();
    }
    return success;
  }, [editor, onToggled]);

  useHotkeys(
    QUOTE_SHORTCUT_KEY,
    (event) => {
      event.preventDefault();
      handleQuote();
    },
    {
      enabled: canToggle,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  );

  return {
    isActive,
    handleQuote,
    canToggle,
    label: "Quote",
    shortcutKeys: QUOTE_SHORTCUT_KEY,
  };
}
