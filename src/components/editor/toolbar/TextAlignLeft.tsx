import type { Editor } from "@tiptap/react";
import { TextAlignLeftIcon } from "@/icons/outline/design-development/sm/TextAlignLeftIcon";
import { Toggle } from "@/components/toggle/Toggle";

type TextAlignLeftPropsType = {
  editor: Editor;
};

export const TextAlignLeft = ({ editor }: TextAlignLeftPropsType) => {
  return (
    <Toggle
      pressed={editor?.isActive({ textAlign: "left" })}
      onPressedChange={(isPressed) => {
        isPressed ? editor?.chain().focus().setTextAlign("left").run() : editor?.chain().focus().unsetTextAlign().run();
      }}
    >
      <TextAlignLeftIcon className="size-6" />
    </Toggle>
  );
};
