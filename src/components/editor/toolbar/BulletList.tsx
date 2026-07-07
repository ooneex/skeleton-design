import type { Editor } from "@tiptap/react";
import { BulletListIcon } from "@/icons/outline/ui-layout/sm/BulletListIcon";
import { Toggle } from "@/components/toggle/Toggle";

type BulletListPropsType = {
  editor: Editor;
  className?: string;
};

export const BulletList = ({ editor, className }: BulletListPropsType) => {
  return (
    <Toggle
      className={className}
      pressed={editor?.isActive("bulletList")}
      onPressedChange={() => {
        editor?.chain().focus().toggleBulletList().run();
      }}
    >
      <BulletListIcon className="size-6" />
    </Toggle>
  );
};
