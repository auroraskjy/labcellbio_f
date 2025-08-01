import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { QuoteNodeView } from "./quote-node-view";

export interface QuoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    quote: {
      setQuote: (attributes?: {
        content?: string;
        source?: string;
      }) => ReturnType;
    };
  }
}

export const Quote = Node.create<QuoteOptions>({
  name: "quote",

  group: "block",

  content: "inline*",

  isolating: true,
  draggable: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      content: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-content") || "",
        renderHTML: (attrs) =>
          attrs.content ? { "data-content": attrs.content } : {},
      },
      source: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-source") || "",
        renderHTML: (attrs) =>
          attrs.source ? { "data-source": attrs.source } : {},
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="quote"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(
        { "data-type": "quote" },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      0,
    ];
  },

  addCommands() {
    return {
      setQuote:
        (attrs) =>
        ({ commands }) => {
          return commands.setNode(this.name, attrs);
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(QuoteNodeView);
  },
});
