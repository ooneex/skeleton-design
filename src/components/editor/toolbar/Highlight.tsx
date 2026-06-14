import type { SimpleColorType } from "@ooneex/color";
import type { Editor } from "@tiptap/react";
import { HighlighterIcon } from "@/icons/outline/school-education/sm/HighlighterIcon";
import { pickColor } from "@/components/color/SimpleColorPicker";
import { Toggle } from "@/components/toggle/Toggle";

type HighlightPropsType = {
  editor: Editor;
  state?: { highlight: string };
};

export const Highlight = ({ editor, state }: HighlightPropsType) => {
  const isHighlightActive = editor?.isActive("highlight");

  const handlePick = async () => {
    const color = await pickColor({ value: state?.highlight as SimpleColorType, title: "Highlight color" });
    if (color) {
      editor?.chain().setHighlight({ color }).run();
    } else {
      editor?.chain().focus().unsetHighlight().run();
    }
  };

  return (
    <Toggle pressed={isHighlightActive} onClick={handlePick}>
      <HighlighterIcon className="size-4" />
    </Toggle>
  );
};
