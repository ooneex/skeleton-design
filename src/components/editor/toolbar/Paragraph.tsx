import type { Editor } from "@tiptap/react";
import { ParagraphIcon } from "@/icons/outline/editing/sm/ParagraphIcon";
import { Toggle } from "@/components/toggle/Toggle";

type ParagraphPropsType = {
  editor: Editor;
  pressed?: boolean;
};

export const Paragraph = ({ editor, pressed }: ParagraphPropsType) => {
  return (
    <Toggle
      pressed={pressed ?? editor?.isActive("paragraph")}
      onPressedChange={() => {
        editor?.chain().focus().setParagraph().run();
      }}
    >
      <ParagraphIcon className="size-4" />
    </Toggle>
  );
};
