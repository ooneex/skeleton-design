import type { Editor } from "@tiptap/react";
import { BulletListIcon } from "@/icons/outline/ui-layout/sm/BulletListIcon";
import { Toggle } from "@/components/toggle/Toggle";

type BulletListPropsType = {
  editor: Editor;
};

export const BulletList = ({ editor }: BulletListPropsType) => {
  return (
    <Toggle
      pressed={editor?.isActive("bulletList")}
      onPressedChange={() => {
        editor?.chain().focus().toggleBulletList().run();
      }}
    >
      <BulletListIcon className="size-6" />
    </Toggle>
  );
};
