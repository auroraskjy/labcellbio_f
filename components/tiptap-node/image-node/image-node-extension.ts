import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Plugin } from "prosemirror-state";
import { ImageNodeView } from "./image-node-view";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      updateImageAlignment: (
        alignment: "left" | "center" | "right"
      ) => ReturnType;
    };
  }
}

export interface ImageNodeOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

interface CommandProps {
  tr: any;
  state: any;
  commands: any;
}

export const ImageNode = Node.create<ImageNodeOptions>({
  name: "image",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  // 드래그 완전히 비활성화
  draggable: true,

  // 선택 가능하게 유지
  selectable: true,

  // 이미지를 단일 단위로 처리
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "auto",
        parseHTML: (element) => element.style.width,
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return { style: `width: ${attributes.width}` };
        },
      },
      height: {
        default: "auto",
        parseHTML: (element) => element.style.height,
        renderHTML: (attributes) => {
          if (!attributes.height) return {};
          return { style: `height: ${attributes.height}` };
        },
      },
      textAlign: {
        default: "center",
        parseHTML: (element) => element.style.textAlign,
        renderHTML: (attributes) => {
          if (!attributes.textAlign) return {};
          return { style: `text-align: ${attributes.textAlign}` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDrop(view, event, slice, moved) {
            const { state, dispatch } = view;

            // 드롭된 노드가 이미지인지 확인
            const node = slice.content.firstChild;
            if (!node || node.type.name !== "image") {
              return false;
            }

            // 현재 문서에서 같은 src를 가진 이미지를 찾아서 삭제
            const { tr } = state;
            const sourceImg = node.attrs.src;

            state.doc.descendants((node, pos) => {
              if (node.type.name === "image" && node.attrs.src === sourceImg) {
                tr.delete(pos, pos + 1);
              }
            });

            // 새 위치에 이미지 삽입
            const dropPos = state.selection.$from.pos;
            tr.insert(dropPos, node);

            dispatch(tr);
            return true;
          },
        },
      }),
    ];
  },

  addCommands() {
    return {
      setImage:
        (options: { src: string; alt?: string; title?: string }) =>
        ({ commands, state }: CommandProps) => {
          const { selection } = state;

          // 이미지를 새 위치에 삽입하기 전에 현재 선택된 이미지 삭제
          if (selection.node?.type.name === this.name) {
            commands.deleteSelection();
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
      updateImageSize:
        (options: { width?: string; height?: string }) =>
        ({ tr, state }: CommandProps) => {
          const { selection } = state;
          const node = selection.$anchor.node();

          if (node.type.name !== this.name) return false;

          const pos = selection.$anchor.pos;

          return tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            ...options,
          });
        },
      updateImageAlignment:
        (alignment: "left" | "center" | "right") =>
        ({ tr, state }: CommandProps) => {
          const { selection } = state;
          const node = selection.$anchor.node();

          if (node.type.name !== this.name) return false;

          const pos = selection.$anchor.pos;

          return tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            textAlign: alignment,
          });
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      // 잘라내기/붙여넣기 단축키 활성화
      "Mod-x": () => true,
      "Mod-v": () => true,
    };
  },
});
