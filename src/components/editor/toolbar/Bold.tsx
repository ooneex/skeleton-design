import type { Editor } from "@tiptap/react";
import { TextBoldIcon } from "@/icons/outline/editing/sm/TextBoldIcon";
import { Toggle } from "@/components/toggle/Toggle";

type BoldPropsType = {
  editor: Editor;
  pressed?: boolean;
};

export const Bold = ({ editor, pressed }: BoldPropsType) => {
  return (
    <Toggle
      pressed={pressed ?? editor?.isActive("bold")}
      onPressedChange={() => {
        editor?.chain().focus().toggleBold().run();
      }}
    >
      <TextBoldIcon className="size-4" />
    </Toggle>
  );
};
