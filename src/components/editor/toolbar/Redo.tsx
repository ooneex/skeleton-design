import type { Editor } from "@tiptap/react";
import { RedoIcon } from "@/icons/outline/arrows/sm/RedoIcon";
import { Toggle } from "@/components/toggle/Toggle";

type RedoPropsType = {
  editor: Editor;
  className?: string;
};

export const Redo = ({ editor, className }: RedoPropsType) => {
  if (!editor?.can().redo()) {
    return null;
  }

  return (
    <Toggle
      className={className}
      pressed={false}
      onPressedChange={() => {
        editor?.chain().focus().redo().run();
      }}
    >
      <RedoIcon className="size-6" />
    </Toggle>
  );
};
