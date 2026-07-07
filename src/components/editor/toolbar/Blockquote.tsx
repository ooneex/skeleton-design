import type { Editor } from "@tiptap/react";
import { BlockquoteIcon } from "@/icons/outline/editing/sm/BlockquoteIcon";
import { Toggle } from "@/components/toggle/Toggle";

type BlockquotePropsType = {
  editor: Editor;
  pressed?: boolean;
  className?: string;
};

export const Blockquote = ({ editor, pressed, className }: BlockquotePropsType) => {
  return (
    <Toggle
      className={className}
      pressed={pressed ?? editor?.isActive("blockquote")}
      onPressedChange={() => {
        editor?.chain().focus().toggleBlockquote().run();
      }}
    >
      <BlockquoteIcon className="size-4" />
    </Toggle>
  );
};
