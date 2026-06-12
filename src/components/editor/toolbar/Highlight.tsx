import type { SimpleColorType } from "@ooneex/color";
import type { Editor } from "@tiptap/react";
import { HighlighterIcon } from "@/icons/outline/school-education/sm/HighlighterIcon";
import { SimpleColorPicker } from "@/components/color/SimpleColorPicker";
import { Toggle } from "@/components/toggle/Toggle";

type HighlightPropsType = {
  editor: Editor;
  state?: { highlight: string };
};

export const Highlight = ({ editor, state }: HighlightPropsType) => {
  const isHighlightActive = editor?.isActive("highlight");

  return (
    <SimpleColorPicker
      value={state?.highlight as SimpleColorType}
      onChange={(color) => {
        editor?.chain().setHighlight({ color }).run();
      }}
      onReset={() => {
        editor?.chain().focus().unsetHighlight().run();
      }}
      contentClassName="w-72"
      trigger={
        <Toggle pressed={isHighlightActive}>
          <HighlighterIcon className="size-4" />
        </Toggle>
      }
    />
  );
};
