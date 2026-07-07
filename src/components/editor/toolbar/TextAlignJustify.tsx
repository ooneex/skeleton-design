import type { Editor } from "@tiptap/react";
import { TextAlignJustifyIcon } from "@/icons/outline/design-development/sm/TextAlignJustifyIcon";
import { Toggle } from "@/components/toggle/Toggle";

type TextAlignJustifyPropsType = {
  editor: Editor;
  className?: string;
};

export const TextAlignJustify = ({ editor, className }: TextAlignJustifyPropsType) => {
  return (
    <Toggle
      className={className}
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
