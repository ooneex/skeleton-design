import type { Editor } from "@tiptap/react";
import { Heading2Icon } from "@/icons/outline/design-development/sm/Heading2Icon";
import { Toggle } from "@/components/toggle/Toggle";

type Heading2PropsType = {
  editor: Editor;
  className?: string;
};

export const Heading2 = ({ editor, className }: Heading2PropsType) => {
  return (
    <Toggle
      className={className}
      pressed={editor?.isActive("heading", { level: 2 })}
      onPressedChange={() => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
      }}
    >
      <Heading2Icon className="size-4.5" />
    </Toggle>
  );
};
