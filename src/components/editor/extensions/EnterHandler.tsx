import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

export const EnterHandler = Extension.create({
  name: "enter_handler",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        props: {
          handleKeyDown: (_view, event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              return false;
            }
          },
        },
      }),
    ];
  },
});
