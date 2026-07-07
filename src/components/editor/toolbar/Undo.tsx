import type { Editor } from "@tiptap/react";
import { UndoIcon } from "@/icons/outline/arrows/sm/UndoIcon";
import { Toggle } from "@/components/toggle/Toggle";

type UndoPropsType = {
  editor: Editor;
  className?: string;
};

export const Undo = ({ editor, className }: UndoPropsType) => {
  if (!editor?.can().undo()) {
    return null;
  }

  return (
    <Toggle
      className={className}
      pressed={false}
      onPressedChange={() => {
        editor?.chain().focus().undo().run();
      }}
    >
      <UndoIcon className="size-6" />
    </Toggle>
  );
};
