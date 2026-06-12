import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Blockquote } from "./toolbar/Blockquote";
import { Bold } from "./toolbar/Bold";
import { Highlight } from "./toolbar/Highlight";
import { Italic } from "./toolbar/Italic";
import { Link } from "./toolbar/Link";
import { Paragraph } from "./toolbar/Paragraph";
import { Strike } from "./toolbar/Strike";
import { Subscript } from "./toolbar/Subscript";
import { Superscript } from "./toolbar/Superscript";
import { TextStyle } from "./toolbar/TextStyle";
import { Underline } from "./toolbar/Underline";

type FloatingToolbarPropsType = {
  editor: Editor;
};

export const FloatingToolbar = ({ editor }: FloatingToolbarPropsType) => {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isParagraph: ctx.editor.isActive("paragraph"),
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isStrike: ctx.editor.isActive("strike"),
      isSubscript: ctx.editor.isActive("subscript"),
      isSuperscript: ctx.editor.isActive("superscript"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      color: ctx.editor.getAttributes("textStyle").color,
      highlight: ctx.editor.getAttributes("highlight").color,
    }),
  });

  return (
    <BubbleMenu
      editor={editor}
      options={{
        placement: "top",
      }}
      className="flex items-center gap-1 p-1 bg-popover text-popover-foreground rounded shadow-md"
    >
      <Paragraph editor={editor} pressed={state.isParagraph} />
      <Bold editor={editor} pressed={state.isBold} />
      <Italic editor={editor} pressed={state.isItalic} />
      <Underline editor={editor} pressed={state.isUnderline} />
      <Strike editor={editor} pressed={state.isStrike} />
      <Subscript editor={editor} pressed={state.isSubscript} />
      <Superscript editor={editor} pressed={state.isSuperscript} />
      <TextStyle editor={editor} state={{ color: state.color }} />
      <Highlight editor={editor} state={{ highlight: state.highlight }} />
      <Blockquote editor={editor} pressed={state.isBlockquote} />
      <Link editor={editor} />
    </BubbleMenu>
  );
};
