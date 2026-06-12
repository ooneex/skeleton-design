import type { Editor } from "@tiptap/react";
import { TextItalicIcon } from "@/icons/outline/design-development/sm/TextItalicIcon";
import { Toggle } from "@/components/toggle/Toggle";

type ItalicPropsType = {
  editor: Editor;
  pressed?: boolean;
};

export const Italic = ({ editor, pressed }: ItalicPropsType) => {
  return (
    <Toggle
      pressed={pressed ?? editor?.isActive("italic")}
      onPressedChange={() => {
        editor?.chain().focus().toggleItalic().run();
      }}
    >
      <TextItalicIcon className="size-4" />
    </Toggle>
  );
};
