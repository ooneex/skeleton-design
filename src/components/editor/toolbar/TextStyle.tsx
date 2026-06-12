import type { SimpleColorType } from "@ooneex/color";
import type { Editor } from "@tiptap/react";
import { PaletteIcon as ColorIcon } from "@/icons/outline/design-development/sm/PaletteIcon";
import { SimpleColorPicker } from "@/components/color/SimpleColorPicker";
import { Toggle } from "@/components/toggle/Toggle";

type TextStylePropsType = {
  editor: Editor;
  state?: { color: string };
};

export const TextStyle = ({ editor, state }: TextStylePropsType) => {
  const isTextStyleActive = editor?.isActive("textStyle");

  return (
    <SimpleColorPicker
      value={state?.color as SimpleColorType}
      onChange={(color) => {
        editor?.chain().setColor(color).run();
      }}
      onReset={() => {
        editor?.chain().unsetColor().run();
      }}
      contentClassName="w-72"
      trigger={
        <Toggle pressed={isTextStyleActive}>
          <ColorIcon className="size-3.5" />
        </Toggle>
      }
    />
  );
};
