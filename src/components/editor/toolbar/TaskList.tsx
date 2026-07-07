import type { Editor } from "@tiptap/react";
import { CheckListIcon as CompletedIcon } from "@/icons/outline/ui-layout/sm/CheckListIcon";
import { Toggle } from "@/components/toggle/Toggle";

type TaskListPropsType = {
  editor: Editor;
  className?: string;
};

export const TaskList = ({ editor, className }: TaskListPropsType) => {
  return (
    <Toggle
      className={className}
      pressed={editor?.isActive("taskList")}
      onPressedChange={() => {
        editor?.chain().focus().toggleTaskList().run();
      }}
    >
      <CompletedIcon className="size-6" />
    </Toggle>
  );
};
