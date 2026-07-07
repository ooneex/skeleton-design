import type { Editor } from "@tiptap/react";
import { OrderedListIcon } from "@/icons/outline/editing/sm/OrderedListIcon";
import { Toggle } from "@/components/toggle/Toggle";

type OrderedListPropsType = {
  editor: Editor;
  className?: string;
};

export const OrderedList = ({ editor, className }: OrderedListPropsType) => {
  return (
    <Toggle
      className={className}
      pressed={editor?.isActive("orderedList")}
      onPressedChange={() => {
        editor?.chain().focus().toggleOrderedList().run();
      }}
    >
      <OrderedListIcon className="size-6" />
    </Toggle>
  );
};
