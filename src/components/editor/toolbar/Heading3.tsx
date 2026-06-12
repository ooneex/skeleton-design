import type { Editor } from "@tiptap/react";
import { Heading3Icon } from "@/icons/outline/design-development/sm/Heading3Icon";
import { Toggle } from "@/components/toggle/Toggle";

type Heading3PropsType = {
  editor: Editor;
};

export const Heading3 = ({ editor }: Heading3PropsType) => {
  return (
    <Toggle
      pressed={editor?.isActive("heading", { level: 3 })}
      onPressedChange={() => {
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
      }}
    >
      <Heading3Icon className="size-4.5" />
    </Toggle>
  );
};
