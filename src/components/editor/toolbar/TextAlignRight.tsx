import type { Editor } from "@tiptap/react";
import { TextAlignRightIcon } from "@/icons/outline/design-development/sm/TextAlignRightIcon";
import { Toggle } from "@/components/toggle/Toggle";

type TextAlignRightPropsType = {
  editor: Editor;
  className?: string;
};

export const TextAlignRight = ({ editor, className }: TextAlignRightPropsType) => {
  return (
    <Toggle
      className={className}
      pressed={editor?.isActive({ textAlign: "right" })}
      onPressedChange={(isPressed) => {
        isPressed
          ? editor?.chain().focus().setTextAlign("right").run()
          : editor?.chain().focus().unsetTextAlign().run();
      }}
    >
      <TextAlignRightIcon className="size-6" />
    </Toggle>
  );
};
