import type { Editor } from "@tiptap/react";
import { LinkIcon } from "@/icons/outline/editing/sm/LinkIcon";
import { Toggle } from "@/components/toggle/Toggle";
import { openLinkDialog } from "../LinkDialog";

type LinkPropsType = {
  editor: Editor;
  pressed?: boolean;
  className?: string;
};

export const Link = ({ editor, pressed, className }: LinkPropsType) => {
  return (
    <Toggle
      className={className}
      pressed={pressed ?? editor?.isActive("link")}
      onPressedChange={() => {
        openLinkDialog(editor);
      }}
    >
      <LinkIcon className="size-4" />
    </Toggle>
  );
};
