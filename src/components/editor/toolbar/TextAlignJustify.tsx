import type { Editor } from "@tiptap/react";
import { TextAlignJustifyIcon } from "@/icons/outline/design-development/sm/TextAlignJustifyIcon";
import { Toggle } from "@/components/toggle/Toggle";

type TextAlignJustifyPropsType = {
  editor: Editor;
};

export const TextAlignJustify = ({ editor }: TextAlignJustifyPropsType) => {
  return (
    <Toggle
      pressed={editor?.isActive({ textAlign: "justify" })}
      onPressedChange={(isPressed) => {
        isPressed
          ? editor?.chain().focus().setTextAlign("justify").run()
          : editor?.chain().focus().unsetTextAlign().run();
      }}
    >
      <TextAlignJustifyIcon className="size-6" />
    </Toggle>
  );
};
