import type { Editor } from "@tiptap/react";
import { Heading3Icon } from "@/icons/outline/design-development/sm/Heading3Icon";
import { Toggle } from "@/components/toggle/Toggle";

type Heading3PropsType = {
  editor: Editor;
  className?: string;
};

export const Heading3 = ({ editor, className }: Heading3PropsType) => {
  return (
    <Toggle
      className={className}
      pressed={editor?.isActive("heading", { level: 3 })}
      onPressedChange={() => {
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
      }}
    >
      <Heading3Icon className="size-4.5" />
    </Toggle>
  );
};
