import type { Editor } from "@tiptap/react";
import { TextAlignCenterIcon } from "@/icons/outline/design-development/sm/TextAlignCenterIcon";
import { Toggle } from "@/components/toggle/Toggle";

type TextAlignCenterPropsType = {
  editor: Editor;
};

export const TextAlignCenter = ({ editor }: TextAlignCenterPropsType) => {
  return (
    <Toggle
      pressed={editor?.isActive({ textAlign: "center" })}
      onPressedChange={(isPressed) => {
        isPressed
          ? editor?.chain().focus().setTextAlign("center").run()
          : editor?.chain().focus().unsetTextAlign().run();
      }}
    >
      <TextAlignCenterIcon className="size-6" />
    </Toggle>
  );
};
