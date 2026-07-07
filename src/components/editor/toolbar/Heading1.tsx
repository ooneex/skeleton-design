import type { Editor } from "@tiptap/react";
import { Heading1Icon } from "@/icons/outline/design-development/sm/Heading1Icon";
import { Toggle } from "@/components/toggle/Toggle";

type Heading1PropsType = {
  editor: Editor;
  className?: string;
};

export const Heading1 = ({ editor, className }: Heading1PropsType) => {
  return (
    <Toggle
      className={className}
      pressed={editor?.isActive("heading", { level: 1 })}
      onPressedChange={() => {
        editor?.chain().focus().toggleHeading({ level: 1 }).run();
      }}
    >
      <Heading1Icon className="size-4.5" />
    </Toggle>
  );
};
