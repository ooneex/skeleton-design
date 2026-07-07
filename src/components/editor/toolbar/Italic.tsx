import type { Editor } from "@tiptap/react";
import { TextItalicIcon } from "@/icons/outline/design-development/sm/TextItalicIcon";
import { Toggle } from "@/components/toggle/Toggle";

type ItalicPropsType = {
  editor: Editor;
  pressed?: boolean;
  className?: string;
};

export const Italic = ({ editor, pressed, className }: ItalicPropsType) => {
  return (
    <Toggle
      className={className}
      pressed={pressed ?? editor?.isActive("italic")}
      onPressedChange={() => {
        editor?.chain().focus().toggleItalic().run();
      }}
    >
      <TextItalicIcon className="size-4" />
    </Toggle>
  );
};
