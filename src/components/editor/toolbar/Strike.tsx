import type { Editor } from "@tiptap/react";
import { TextStrikethroughIcon } from "@/icons/outline/design-development/sm/TextStrikethroughIcon";
import { Toggle } from "@/components/toggle/Toggle";

type StrikePropsType = {
  editor: Editor;
  pressed?: boolean;
};

export const Strike = ({ editor, pressed }: StrikePropsType) => {
  return (
    <Toggle
      pressed={pressed ?? editor?.isActive("strike")}
      onPressedChange={() => {
        editor?.chain().focus().toggleStrike().run();
      }}
    >
      <TextStrikethroughIcon className="size-4" />
    </Toggle>
  );
};
