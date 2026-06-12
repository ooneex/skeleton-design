import type { Editor } from "@tiptap/react";
import { RedoIcon } from "@/icons/outline/arrows/sm/RedoIcon";
import { Toggle } from "@/components/toggle/Toggle";

type RedoPropsType = {
  editor: Editor;
};

export const Redo = ({ editor }: RedoPropsType) => {
  if (!editor?.can().redo()) {
    return null;
  }

  return (
    <Toggle
      pressed={false}
      onPressedChange={() => {
        editor?.chain().focus().redo().run();
      }}
    >
      <RedoIcon className="size-6" />
    </Toggle>
  );
};
