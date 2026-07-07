import type { Editor } from "@tiptap/react";
import { ParagraphIcon } from "@/icons/outline/editing/sm/ParagraphIcon";
import { Toggle } from "@/components/toggle/Toggle";

type ParagraphPropsType = {
  editor: Editor;
  pressed?: boolean;
  className?: string;
};

export const Paragraph = ({ editor, pressed, className }: ParagraphPropsType) => {
  return (
    <Toggle
      className={className}
      pressed={pressed ?? editor?.isActive("paragraph")}
      onPressedChange={() => {
        editor?.chain().focus().setParagraph().run();
      }}
    >
      <ParagraphIcon className="size-4" />
    </Toggle>
  );
};
