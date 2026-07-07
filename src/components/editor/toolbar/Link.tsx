import type { Editor } from "@tiptap/react";
import { LinkIcon } from "@/icons/outline/editing/sm/LinkIcon";
import { Toggle } from "@/components/toggle/Toggle";
import { openLinkDialog } from "../LinkDialog";

type LinkPropsType = {
  editor: Editor;
  pressed?: boolean;
};

export const Link = ({ editor, pressed }: LinkPropsType) => {
  return (
    <Toggle
      pressed={pressed ?? editor?.isActive("link")}
      onPressedChange={() => {
        openLinkDialog(editor);
      }}
    >
      <LinkIcon className="size-4" />
    </Toggle>
  );
};
