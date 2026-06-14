import type { SimpleColorType } from "@ooneex/color";
import type { Editor } from "@tiptap/react";
import { PaletteIcon as ColorIcon } from "@/icons/outline/design-development/sm/PaletteIcon";
import { pickColor } from "@/components/color/SimpleColorPicker";
import { Toggle } from "@/components/toggle/Toggle";

type TextStylePropsType = {
  editor: Editor;
  state?: { color: string };
};

export const TextStyle = ({ editor, state }: TextStylePropsType) => {
  const isTextStyleActive = editor?.isActive("textStyle");

  const handlePick = async () => {
    const color = await pickColor({ value: state?.color as SimpleColorType, title: "Text color" });
    if (color) {
      editor?.chain().setColor(color).run();
    } else {
      editor?.chain().unsetColor().run();
    }
  };

  return (
    <Toggle pressed={isTextStyleActive} onClick={handlePick}>
      <ColorIcon className="size-3.5" />
    </Toggle>
  );
};
