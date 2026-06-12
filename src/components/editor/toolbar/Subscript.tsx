import type { Editor } from "@tiptap/react";
import { SubscriptIcon as TextSubscriptIcon } from "@/icons/outline/editing/sm/SubscriptIcon";
import { Toggle } from "@/components/toggle/Toggle";

type SubscriptPropsType = {
  editor: Editor;
  pressed?: boolean;
};

export const Subscript = ({ editor, pressed }: SubscriptPropsType) => {
  return (
    <Toggle
      pressed={pressed ?? editor?.isActive("subscript")}
      onPressedChange={() => {
        editor?.chain().focus().toggleSubscript().run();
      }}
    >
      <TextSubscriptIcon className="size-3.5" />
    </Toggle>
  );
};
