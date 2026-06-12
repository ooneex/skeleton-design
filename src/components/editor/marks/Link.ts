import Link from "@tiptap/extension-link";

export const LinkMark = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      "data-ooneex-mention": {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-ooneex-mention"),
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes["data-ooneex-mention"]) {
            return {};
          }
          return { "data-ooneex-mention": attributes["data-ooneex-mention"] };
        },
      },
      "data-ooneex-id": {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-ooneex-id"),
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes["data-ooneex-id"]) {
            return {};
          }
          return { "data-ooneex-id": attributes["data-ooneex-id"] };
        },
      },
      "data-ooneex-type": {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-ooneex-type"),
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes["data-ooneex-type"]) {
            return {};
          }
          return { "data-ooneex-type": attributes["data-ooneex-type"] };
        },
      },
      style: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("style"),
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes.style) {
            return {};
          }
          return { style: attributes.style };
        },
      },
    };
  },
}).configure({
  HTMLAttributes: {
    class: "text-secondary-400 underline cursor-pointer",
  },
  openOnClick: true,
  autolink: true,
  defaultProtocol: "https",
  protocols: ["http", "https"],
});
