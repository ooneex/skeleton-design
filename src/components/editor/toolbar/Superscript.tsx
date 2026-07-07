import type { Editor } from "@tiptap/react";
import { SuperscriptIcon as TextSuperscriptIcon } from "@/icons/outline/editing/sm/SuperscriptIcon";
import { Toggle } from "@/components/toggle/Toggle";

type SuperscriptPropsType = {
  editor: Editor;
  pressed?: boolean;
  className?: string;
};

export const Superscript = ({ editor, pressed, className }: SuperscriptPropsType) => {
  return (
    <Toggle
      className={className}
      pressed={pressed ?? editor?.isActive("superscript")}
      onPressedChange={() => {
        editor?.chain().focus().toggleSuperscript().run();
      }}
    >
      <TextSuperscriptIcon className="size-3.5" />
    </Toggle>
  );
};
