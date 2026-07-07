import type { Editor } from "@tiptap/react";
import { TextUnderlineIcon } from "@/icons/outline/design-development/sm/TextUnderlineIcon";
import { Toggle } from "@/components/toggle/Toggle";

type UnderlinePropsType = {
  editor: Editor;
  pressed?: boolean;
  className?: string;
};

export const Underline = ({ editor, pressed, className }: UnderlinePropsType) => {
  return (
    <Toggle
      className={className}
      pressed={pressed ?? editor?.isActive("underline")}
      onPressedChange={() => {
        editor?.chain().focus().toggleUnderline().run();
      }}
    >
      <TextUnderlineIcon className="size-4" />
    </Toggle>
  );
};
