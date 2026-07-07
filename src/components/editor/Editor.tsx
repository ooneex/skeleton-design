import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import "./editor.css";
import type { Editor as EditorType } from "@tiptap/react";
import { useImperativeHandle } from "react";
import { Markdown } from "tiptap-markdown";
import { SimpleColorPicker } from "@/components/color/SimpleColorPicker";
import { cn } from "@/utils/cn";
import { EnterHandler } from "./extensions/EnterHandler";
import { FloatingToolbar } from "./FloatingToolbar";
import { LinkDialog } from "./LinkDialog";
import { LinkMark } from "./marks/Link";
import { SlashMenu } from "./SlashMenu";
import { YouTubeDialog } from "./YouTubeDialog";

export type EditorRefType = {
  getContent: () => string;
  getEditor: () => EditorType;
  setContent: (content: string) => void;
  insertContent: (content: string) => void;
  insertContentAt: (position: number, content: string) => void;
  deleteSelection: () => void;
  focus: () => void;
  blur: () => void;
};

export type EditorPropsType = {
  placeholder?: string;
  content?: string;
  onContentChange?: (content: string) => void;
  onSelectionChange?: (data: { content: string; editor: EditorType }) => void;
  onSubmit?: () => void;
  editable?: boolean;
  ref?: React.RefObject<EditorRefType | null>;
  className?: string;
  showHeadings?: boolean;
  showHistory?: boolean;
  showMedia?: boolean;
  showSlashMenu?: boolean;
  showToolbar?: boolean;
  plainText?: boolean;
};

type EditorExtensionsOptionsType = {
  placeholder: string;
  showHeadings?: boolean;
  showHistory?: boolean;
  showMedia?: boolean;
  showSlashMenu?: boolean;
  plainText?: boolean;
};

export const getEditorExtensions = ({
  placeholder,
  showHeadings = true,
  showHistory = true,
  showMedia = true,
  showSlashMenu = true,
  plainText = false,
}: EditorExtensionsOptionsType) => {
  if (plainText) {
    return [
      Document,
      Paragraph,
      Text,
      HardBreak,
      Placeholder.configure({ placeholder }),
      ...(showHistory ? [History] : []),
      EnterHandler,
    ];
  }
  return [
    Document,
    Paragraph,
    Text,
    TextStyle,
    Color,
    Bold.configure({ HTMLAttributes: { class: "font-semibold" } }),
    Italic.configure({ HTMLAttributes: { class: "italic" } }),
    Strike,
    Subscript,
    Superscript,
    Underline,
    LinkMark,
    Highlight.configure({ multicolor: true }),
    History,
    Blockquote.configure({
      HTMLAttributes: { class: "border-l-2 border-primary pl-4" },
    }),
    TextAlign.configure({
      types: showHeadings ? ["heading", "paragraph"] : ["paragraph"],
      defaultAlignment: "left",
    }),
    ...(showMedia
      ? [
          Image.configure({
            inline: true,
            allowBase64: false,
          }),
        ]
      : []),
    Gapcursor,
    Dropcursor,
    HardBreak,
    Placeholder.configure({
      placeholder: placeholder,
    }),
    BulletList,
    OrderedList,
    ListItem.configure({
      HTMLAttributes: { class: "ml-4" },
    }),
    ...(showHeadings
      ? [
          Heading.configure({
            levels: [1, 2, 3],
          }),
        ]
      : []),
    HorizontalRule,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    ...(showMedia
      ? [
          Youtube.configure({
            controls: true,
            nocookie: true,
          }),
        ]
      : []),
    // ImageResize.configure({
    // inline: false,
    // }),
    EnterHandler,
    Markdown.configure({
      html: true,
      transformPastedText: true,
      transformCopiedText: true,
    }),
    ...(showSlashMenu
      ? [
          SlashMenu.configure({
            showHeadings,
            showHistory,
            showMedia,
          }),
        ]
      : []),
  ];
};

export const getSelectionText = (editor: EditorType): string => {
  const { view, state } = editor;
  const { from, to } = view.state.selection;
  const text = state.doc.textBetween(from, to, "").trim();

  return text;
};

export const Editor = ({
  content,
  placeholder,
  editable = true,
  ref,
  onContentChange,
  onSelectionChange,
  onSubmit,
  className,
  showHeadings = true,
  showHistory = true,
  showMedia = true,
  showSlashMenu = true,
  showToolbar = true,
  plainText = false,
}: EditorPropsType) => {
  const resolvedPlaceholder = placeholder ?? (showSlashMenu ? "Type something or '/' to start" : "Type something...");

  const editor = useEditor({
    immediatelyRender: true,
    extensions: getEditorExtensions({
      placeholder: resolvedPlaceholder,
      showHeadings,
      showHistory,
      showMedia,
      showSlashMenu,
      plainText,
    }),
    content: content || "",
    onSelectionUpdate({ editor }) {
      onSelectionChange?.({ editor, content: getSelectionText(editor) });
    },
    onUpdate({ editor }) {
      onContentChange?.(editor.getHTML().trim());
    },
    editorProps: {
      attributes: {
        class: "border-none outline-none px-0",
      },
      handleKeyDown: (_view, event) => {
        if (event.key === "Enter" && !event.shiftKey && onSubmit) {
          event.preventDefault();
          onSubmit();
          return true;
        }
        return false;
      },
    },
    editable,
  });

  useImperativeHandle(ref, () => {
    return {
      setContent(content: string) {
        editor.commands.setContent(content);
      },
      insertContent(content: string) {
        editor.commands.insertContent(content);
      },
      insertContentAt(position: number, content: string) {
        editor.commands.insertContentAt(position, content);
      },
      getSelection() {
        return getSelectionText(editor);
      },
      deleteSelection() {
        editor.commands.deleteSelection();
      },
      focus() {
        editor.commands.focus();
      },
      blur() {
        editor.commands.blur();
      },
      getContent() {
        return editor.getHTML().trim();
      },
      getEditor() {
        return editor;
      },
    };
  }, [editor]);

  return (
    <>
      {editor && editable && showToolbar ? <FloatingToolbar editor={editor} /> : null}
      {/* react-call Roots for the toolbar's imperative color picker and link dialog (single mount per editor). */}
      {editor && editable && showToolbar ? <SimpleColorPicker /> : null}
      {editor && editable && showToolbar ? <LinkDialog /> : null}
      <EditorContent editor={editor} className={cn("h-full w-full p-0 m-0", className)} />
      {showMedia ? <YouTubeDialog /> : null}
    </>
  );
};
