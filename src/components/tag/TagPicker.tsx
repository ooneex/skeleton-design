import { useDebouncedValue } from "@tanstack/react-pacer";
import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode, useMemo, useState } from "react";
import { Button } from "@/components/button/Button";
import { Combobox } from "@/components/combobox/Combobox";
import { ComboboxChip } from "@/components/combobox/ComboboxChip";
import { ComboboxChips } from "@/components/combobox/ComboboxChips";
import { ComboboxChipsInput } from "@/components/combobox/ComboboxChipsInput";
import { ComboboxContent } from "@/components/combobox/ComboboxContent";
import { ComboboxEmpty } from "@/components/combobox/ComboboxEmpty";
import { ComboboxItem } from "@/components/combobox/ComboboxItem";
import { ComboboxList } from "@/components/combobox/ComboboxList";
import { ComboboxValue } from "@/components/combobox/ComboboxValue";
import { useComboboxAnchor } from "@/components/combobox/useComboboxAnchor";
import { createDialog } from "@/components/dialog/Dialog";
import { DialogHeader } from "@/components/dialog/DialogHeader";
import { DialogTitle } from "@/components/dialog/DialogTitle";
import { TagIcon } from "@/icons/outline/shopping/sm/TagIcon";
import { PlusIcon as AddIcon } from "@/icons/outline/ui-layout/sm/PlusIcon";
import { cn } from "@/utils/cn";

const tagPickerChipsVariants = cva("flex-wrap items-center gap-1.5", {
  variants: {
    size: {
      xs: "min-h-6 px-2 py-0.5 text-xs",
      sm: "min-h-8 px-2.5 py-1 text-sm",
      md: "min-h-9 px-2.5 py-1 text-base",
      lg: "min-h-10 px-3 py-1.5 text-base",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const tagPickerIconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-3.5",
      md: "size-4",
      lg: "size-4.5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type TagPickerPropsType = VariantProps<typeof tagPickerChipsVariants> & {
  /** Initially selected tags. */
  value?: string[];
  /** Tags offered as suggestions. */
  suggestedTags?: string[];
  /** Allow creating new tags from the input. Defaults to `true`. */
  allowCreate?: boolean;
  placeholder?: string;
  isPending?: boolean;
  /** Heading shown above the tag input. */
  title?: ReactNode;
  className?: string;
  contentClassName?: string;
  confirmLabel?: ReactNode;
};

/**
 * Imperative tag picker dialog built on `react-call`.
 *
 * Mount the Root once near the top of your app:
 *
 * ```tsx
 * <TagPicker />
 * ```
 *
 * Then await a tag selection from anywhere:
 *
 * ```tsx
 * const tags = await pickTags({ value: current, suggestedTags })
 * if (tags) await api.update({ tags })
 * ```
 *
 * Resolves with the chosen tag array, or `null` when the dialog is dismissed
 * (Escape / outside click).
 */
export const TagPicker = createDialog<TagPickerPropsType, string[] | null>(
  ({
    call,
    value = [],
    suggestedTags = [],
    allowCreate = true,
    placeholder = "Add tags...",
    isPending = false,
    title,
    className,
    contentClassName,
    confirmLabel = "Done",
    size = "sm",
  }) => {
    const [selected, setSelected] = useState<string[]>(value);
    const [inputValue, setInputValue] = useState("");
    const [debouncedInputValue] = useDebouncedValue(inputValue, { wait: 300 });
    const [isFocused, setIsFocused] = useState(false);
    const [customTags, setCustomTags] = useState<string[]>([]);
    const anchorRef = useComboboxAnchor();

    const allSuggestedTags = useMemo(() => [...suggestedTags, ...customTags], [suggestedTags, customTags]);

    const filteredTags = useMemo(() => {
      const baseTags = debouncedInputValue.trim()
        ? allSuggestedTags.filter((tag) => tag.toLowerCase().includes(debouncedInputValue.toLowerCase()))
        : allSuggestedTags;
      const missingTags = selected.filter((tag) => !baseTags.includes(tag));
      return [...baseTags, ...missingTags];
    }, [debouncedInputValue, allSuggestedTags, selected]);

    const showCreateOption = useMemo(() => {
      if (!allowCreate) return false;
      if (!debouncedInputValue.trim()) return false;
      const query = debouncedInputValue.toLowerCase();
      const existsInSuggested = allSuggestedTags.some((tag) => tag.toLowerCase() === query);
      const existsInSelected = selected.some((tag) => tag.toLowerCase() === query);
      return !existsInSuggested && !existsInSelected;
    }, [allowCreate, debouncedInputValue, allSuggestedTags, selected]);

    const handleCreateTag = () => {
      const newTag = inputValue.trim();
      if (newTag) {
        setCustomTags((prev) => [...prev, newTag]);
        setSelected((prev) => [...prev, newTag]);
        setInputValue("");
      }
    };

    return (
      <>
        {title ? (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        ) : null}
        <Combobox
          multiple
          autoHighlight
          items={filteredTags}
          value={selected}
          onValueChange={setSelected}
          inputValue={inputValue}
          onInputValueChange={setInputValue}
        >
          <ComboboxChips ref={anchorRef} className={cn(tagPickerChipsVariants({ size }), className)}>
            <ComboboxValue>
              {(values) => (
                <>
                  {values.map((tag: string) => (
                    <ComboboxChip key={tag}>{tag}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </>
              )}
            </ComboboxValue>
            <TagIcon
              className={cn(
                tagPickerIconVariants({ size }),
                isFocused || inputValue ? "text-foreground" : "text-muted-foreground",
              )}
            />
          </ComboboxChips>
          {(isPending || filteredTags.length > 0 || showCreateOption) && (
            <ComboboxContent anchor={anchorRef} className={contentClassName}>
              {isPending && <ComboboxEmpty>Loading tags…</ComboboxEmpty>}
              {!isPending && showCreateOption && (
                <div
                  className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded mx-1 mt-1"
                  onClick={handleCreateTag}
                >
                  <AddIcon className={tagPickerIconVariants({ size })} />
                  <span className="text-sm">
                    Create "<span className="text-sm font-medium">{inputValue.trim()}</span>"
                  </span>
                </div>
              )}
              {!isPending && !showCreateOption && <ComboboxEmpty>No matching tags</ComboboxEmpty>}
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          )}
        </Combobox>
        <Button onClick={() => call.end(selected)} className="w-full">
          {confirmLabel}
        </Button>
      </>
    );
  },
  { dismissValue: null, className: "max-w-md" },
);
TagPicker.displayName = "TagPicker";

export { tagPickerChipsVariants, tagPickerIconVariants };

/** Await a tag selection. Resolves the chosen tags, or `null` on dismiss. */
export const pickTags = (props: TagPickerPropsType = {}) => TagPicker.call(props);
