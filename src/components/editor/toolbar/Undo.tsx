import type { Editor } from "@tiptap/react";
import { UndoIcon } from "@/icons/outline/arrows/sm/UndoIcon";
import { Toggle } from "@/components/toggle/Toggle";

type UndoPropsType = {
  editor: Editor;
};

export const Undo = ({ editor }: UndoPropsType) => {
  if (!editor?.can().undo()) {
    return null;
  }

  return (
    <Toggle
      pressed={false}
      onPressedChange={() => {
        editor?.chain().focus().undo().run();
      }}
    >
      <UndoIcon className="size-6" />
    </Toggle>
  );
};
