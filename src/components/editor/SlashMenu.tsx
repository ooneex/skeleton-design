import type { Editor, Range } from "@tiptap/core";
import { Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import Suggestion from "@tiptap/suggestion";
import {
  type FC,
  forwardRef,
  type SVGProps,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import tippy, { type Instance } from "tippy.js";
import { RedoIcon } from "@/icons/outline/arrows/sm/RedoIcon";
import { UndoIcon } from "@/icons/outline/arrows/sm/UndoIcon";
import { Heading1Icon } from "@/icons/outline/design-development/sm/Heading1Icon";
import { Heading2Icon } from "@/icons/outline/design-development/sm/Heading2Icon";
import { Heading3Icon } from "@/icons/outline/design-development/sm/Heading3Icon";
import { TextAlignCenterIcon } from "@/icons/outline/design-development/sm/TextAlignCenterIcon";
import { TextAlignJustifyIcon } from "@/icons/outline/design-development/sm/TextAlignJustifyIcon";
import { TextAlignLeftIcon } from "@/icons/outline/design-development/sm/TextAlignLeftIcon";
import { TextAlignRightIcon } from "@/icons/outline/design-development/sm/TextAlignRightIcon";
import { TextItalicIcon } from "@/icons/outline/design-development/sm/TextItalicIcon";
import { TextStrikethroughIcon } from "@/icons/outline/design-development/sm/TextStrikethroughIcon";
import { TextUnderlineIcon } from "@/icons/outline/design-development/sm/TextUnderlineIcon";
import { BlockquoteIcon } from "@/icons/outline/editing/sm/BlockquoteIcon";
import { OrderedListIcon } from "@/icons/outline/editing/sm/OrderedListIcon";
import { ParagraphIcon } from "@/icons/outline/editing/sm/ParagraphIcon";
import { SubscriptIcon as TextSubscriptIcon } from "@/icons/outline/editing/sm/SubscriptIcon";
import { SuperscriptIcon as TextSuperscriptIcon } from "@/icons/outline/editing/sm/SuperscriptIcon";
import { TextBoldIcon } from "@/icons/outline/editing/sm/TextBoldIcon";
import { VideoIcon as YoutubeIcon } from "@/icons/outline/photography-video/sm/VideoIcon";
import { BulletListIcon } from "@/icons/outline/ui-layout/sm/BulletListIcon";
import { CircleCheckIcon as CompletedIcon } from "@/icons/outline/ui-layout/sm/CircleCheckIcon";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";
import { openYouTubeDialog } from "./YouTubeDialog";

type SlashMenuItemType = {
  title: string;
  description: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  group: string;
  command: (props: { editor: Editor; range: Range }) => void;
  aliases?: string[];
};

const SLASH_MENU_ITEMS: SlashMenuItemType[] = [
  // Headings group
  {
    title: "Heading 1",
    description: "Large section heading",
    icon: Heading1Icon,
    group: "Headings",
    aliases: ["h1", "heading1"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: Heading2Icon,
    group: "Headings",
    aliases: ["h2", "heading2"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: Heading3Icon,
    group: "Headings",
    aliases: ["h3", "heading3"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
    },
  },

  // Text formatting group
  {
    title: "Bold",
    description: "Make text bold",
    icon: TextBoldIcon,
    group: "Text Formatting",
    aliases: ["strong"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark("bold").run();
    },
  },
  {
    title: "Italic",
    description: "Make text italic",
    icon: TextItalicIcon,
    group: "Text Formatting",
    aliases: ["em", "emphasis"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark("italic").run();
    },
  },
  {
    title: "Underline",
    description: "Underline text",
    icon: TextUnderlineIcon,
    group: "Text Formatting",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark("underline").run();
    },
  },
  {
    title: "Strikethrough",
    description: "Strike through text",
    icon: TextStrikethroughIcon,
    group: "Text Formatting",
    aliases: ["strike", "del"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark("strike").run();
    },
  },
  {
    title: "Subscript",
    description: "Make text subscript",
    icon: TextSubscriptIcon,
    group: "Text Formatting",
    aliases: ["sub"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark("subscript").run();
    },
  },
  {
    title: "Superscript",
    description: "Make text superscript",
    icon: TextSuperscriptIcon,
    group: "Text Formatting",
    aliases: ["sup"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setMark("superscript").run();
    },
  },

  // Text alignment group
  {
    title: "Align Left",
    description: "Align text to the left",
    icon: TextAlignLeftIcon,
    group: "Alignment",
    aliases: ["left"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setTextAlign("left").run();
    },
  },
  {
    title: "Align Center",
    description: "Center align text",
    icon: TextAlignCenterIcon,
    group: "Alignment",
    aliases: ["center"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setTextAlign("center").run();
    },
  },
  {
    title: "Align Right",
    description: "Align text to the right",
    icon: TextAlignRightIcon,
    group: "Alignment",
    aliases: ["right"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setTextAlign("right").run();
    },
  },
  {
    title: "Justify",
    description: "Justify text",
    icon: TextAlignJustifyIcon,
    group: "Alignment",
    aliases: ["justified"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setTextAlign("justify").run();
    },
  },

  // Lists group
  {
    title: "Bullet List",
    description: "Create a bullet list",
    icon: BulletListIcon,
    group: "Lists",
    aliases: ["ul", "unordered"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a numbered list",
    icon: OrderedListIcon,
    group: "Lists",
    aliases: ["ol", "ordered"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Task List",
    description: "Create a task list with checkboxes",
    icon: CompletedIcon,
    group: "Lists",
    aliases: ["todo", "checklist"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },

  // Blocks group
  {
    title: "Paragraph",
    description: "Convert to paragraph",
    icon: ParagraphIcon,
    group: "Blocks",
    aliases: ["p", "text", "normal"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: "Blockquote",
    description: "Create a blockquote",
    icon: BlockquoteIcon,
    group: "Blocks",
    aliases: ["quote"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },

  // Media group
  {
    title: "YouTube",
    description: "Embed a YouTube video",
    icon: YoutubeIcon,
    group: "Media",
    aliases: ["video", "embed"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      openYouTubeDialog(editor);
    },
  },

  // History group
  {
    title: "Undo",
    description: "Undo the last action",
    icon: UndoIcon,
    group: "History",
    aliases: ["back", "revert"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).undo().run();
    },
  },
  {
    title: "Redo",
    description: "Redo the last undone action",
    icon: RedoIcon,
    group: "History",
    aliases: ["forward", "repeat"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).redo().run();
    },
  },
];

type SlashMenuListRefType = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

type SlashMenuListPropsType = {
  items: SlashMenuItemType[];
  command: (item: SlashMenuItemType) => void;
};

const SlashMenuList = forwardRef<SlashMenuListRefType, SlashMenuListPropsType>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    },
    [items, command],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset selected index when items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  // Scroll selected item into view when navigating with keyboard
  useEffect(() => {
    const selectedElement = itemRefs.current.get(selectedIndex);
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  }, [selectedIndex]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev + items.length - 1) % items.length);
        return true;
      }

      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % items.length);
        return true;
      }

      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  if (items.length === 0) {
    return <div className="bg-popover text-popover-foreground rounded shadow-md p-2 text-sm">No results found</div>;
  }

  // Group items by their group property
  const groupedItems = items.reduce<Record<string, SlashMenuItemType[]>>((acc, item) => {
    const group = acc[item.group] ?? [];
    group.push(item);
    acc[item.group] = group;
    return acc;
  }, {});

  // Calculate flat index for each item
  let flatIndex = 0;
  const itemsWithIndex: { item: SlashMenuItemType; index: number }[] = [];
  for (const group of Object.keys(groupedItems)) {
    for (const item of groupedItems[group] ?? []) {
      itemsWithIndex.push({ item, index: flatIndex });
      flatIndex++;
    }
  }

  // Group the items with their indices
  const groupedItemsWithIndex = itemsWithIndex.reduce<Record<string, { item: SlashMenuItemType; index: number }[]>>(
    (acc, { item, index }) => {
      const group = acc[item.group] ?? [];
      group.push({ item, index });
      acc[item.group] = group;
      return acc;
    },
    {},
  );

  return (
    <div className="bg-popover text-popover-foreground rounded shadow-none ring ring-ring-active p-1">
      <div className="overflow-y-auto max-h-80 min-w-64">
        {Object.entries(groupedItemsWithIndex).map(([group, groupItems]) => (
          <div key={group} className="p-1 flex flex-col gap-2">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/50">
              {group}
            </div>
            {groupItems.map(({ item, index }) => (
              <Button
                key={item.title}
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(index, el);
                  } else {
                    itemRefs.current.delete(index);
                  }
                }}
                variant="ghost"
                className={cn(
                  "flex items-center gap-3 w-full h-auto px-0 py-2 justify-start rounded",
                  index === selectedIndex && "bg-accent text-accent-foreground",
                )}
                onClick={() => selectItem(index)}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded bg-muted">
                  {(() => {
                    const Icon = item.icon;
                    return <Icon />;
                  })()}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

SlashMenuList.displayName = "SlashMenuList";

const getSuggestionItems = ({
  query,
  showHeadings = true,
  showHistory = true,
  showMedia = true,
}: {
  query: string;
  showHeadings?: boolean;
  showHistory?: boolean;
  showMedia?: boolean;
}): SlashMenuItemType[] => {
  const lowerQuery = query.toLowerCase();

  return SLASH_MENU_ITEMS.filter((item) => {
    if (!showHeadings && item.group === "Headings") {
      return false;
    }

    if (!showHistory && item.group === "History") {
      return false;
    }

    if (!showMedia && item.group === "Media") {
      return false;
    }

    const matchTitle = item.title.toLowerCase().includes(lowerQuery);
    const matchDescription = item.description.toLowerCase().includes(lowerQuery);
    const matchAliases = item.aliases?.some((alias) => alias.toLowerCase().includes(lowerQuery));

    return matchTitle || matchDescription || matchAliases;
  });
};

const renderSuggestion = (): Omit<
  SuggestionOptions<SlashMenuItemType>["render"],
  "onBeforeStart" | "onBeforeUpdate"
> => {
  let component: ReactRenderer<SlashMenuListRefType> | null = null;
  let popup: Instance[] | null = null;

  return {
    onStart: (props: SuggestionProps<SlashMenuItemType>) => {
      component = new ReactRenderer(SlashMenuList, {
        props,
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      const editorElement = props.editor.view.dom;
      const appendTarget = editorElement.closest("[data-slot='drawer-content']") ?? document.body;

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect as () => DOMRect,
        appendTo: () => appendTarget,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },

    onUpdate: (props: SuggestionProps<SlashMenuItemType>) => {
      component?.updateProps(props);

      if (!props.clientRect) {
        return;
      }

      popup?.[0]?.setProps({
        getReferenceClientRect: props.clientRect as () => DOMRect,
      });
    },

    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0]?.hide();
        return true;
      }

      return component?.ref?.onKeyDown(props) ?? false;
    },

    onExit: () => {
      popup?.[0]?.destroy();
      component?.destroy();
    },
  };
};

type SlashMenuOptionsType = {
  showHeadings?: boolean;
  showHistory?: boolean;
  showMedia?: boolean;
  suggestion?: {
    char: string;
    command: (props: { editor: Editor; range: Range; props: SlashMenuItemType }) => void;
  };
};

export const SlashMenu = Extension.create<SlashMenuOptionsType>({
  name: "slashMenu",

  addOptions() {
    return {
      showHeadings: true,
      showHistory: true,
      showMedia: true,
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: { editor: Editor; range: Range; props: SlashMenuItemType }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    const { showHeadings, showHistory, showMedia } = this.options;

    return [
      Suggestion({
        pluginKey: new PluginKey("slashMenu"),
        editor: this.editor,
        ...this.options.suggestion,
        items: ({ query }: { query: string }) => getSuggestionItems({ query, showHeadings, showHistory, showMedia }),
        render: renderSuggestion,
      }),
    ];
  },
});
