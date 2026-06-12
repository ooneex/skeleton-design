import type { Editor } from "@tiptap/react";
import { SuperscriptIcon as TextSuperscriptIcon } from "@/icons/outline/editing/sm/SuperscriptIcon";
import { Toggle } from "@/components/toggle/Toggle";

type SuperscriptPropsType = {
  editor: Editor;
  pressed?: boolean;
};

export const Superscript = ({ editor, pressed }: SuperscriptPropsType) => {
  return (
    <Toggle
      pressed={pressed ?? editor?.isActive("superscript")}
      onPressedChange={() => {
        editor?.chain().focus().toggleSuperscript().run();
      }}
    >
      <TextSuperscriptIcon className="size-3.5" />
    </Toggle>
  );
};
