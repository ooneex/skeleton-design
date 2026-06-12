import { useDebouncedValue } from "@tanstack/react-pacer";
import { cva, type VariantProps } from "class-variance-authority";
import { useMemo, useState } from "react";
import { TagIcon } from "@/icons/outline/shopping/sm/TagIcon";
import { PlusIcon as AddIcon } from "@/icons/outline/ui-layout/sm/PlusIcon";
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
import { useDrawerContentRef } from "@/components/drawer/drawerContext";
import { cn } from "@/utils/cn";

export const tagPickerVariants = cva("", {
  variants: {
    size: {
      xs: "min-h-6 px-1.5 py-0.5 text-xs",
      sm: "min-h-8 px-2 py-1 text-sm",
      md: "min-h-9 px-2.5 py-1.5 text-base",
      lg: "min-h-10 px-3 py-2 text-base",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type TagPickerPropsType = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  contentClassName?: string;
  allowCreate?: boolean;
  suggestedTags?: string[];
  isPending?: boolean;
} & VariantProps<typeof tagPickerVariants>;

export const TagPicker = ({
  value,
  onChange,
  placeholder = "Add tags...",
  size,
  className,
  contentClassName,
  allowCreate = true,
  suggestedTags = [],
  isPending = false,
}: TagPickerPropsType) => {
  const drawerContentRef = useDrawerContentRef();
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
    const missingTags = value.filter((tag) => !baseTags.includes(tag));
    return [...baseTags, ...missingTags];
  }, [debouncedInputValue, allSuggestedTags, value]);

  const showCreateOption = useMemo(() => {
    if (!allowCreate) return false;
    if (!debouncedInputValue.trim()) return false;
    const query = debouncedInputValue.toLowerCase();
    const existsInSuggested = allSuggestedTags.some((tag) => tag.toLowerCase() === query);
    const existsInSelected = value.some((tag) => tag.toLowerCase() === query);
    return !existsInSuggested && !existsInSelected;
  }, [allowCreate, debouncedInputValue, allSuggestedTags, value]);

  const handleCreateTag = () => {
    const newTag = inputValue.trim();
    if (newTag) {
      setCustomTags((prev) => [...prev, newTag]);
      onChange([...value, newTag]);
      setInputValue("");
    }
  };

  return (
    <Combobox
      multiple
      autoHighlight
      items={filteredTags}
      value={value}
      onValueChange={onChange}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
    >
      <ComboboxChips ref={anchorRef} className={cn(tagPickerVariants({ size }), className)}>
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
        <TagIcon className={cn("size-4", isFocused || inputValue ? "text-foreground" : "text-muted-foreground")} />
      </ComboboxChips>
      {(isPending || filteredTags.length > 0 || showCreateOption) && (
        <ComboboxContent anchor={anchorRef} className={contentClassName} container={drawerContentRef}>
          {isPending && <ComboboxEmpty>Loading tags…</ComboboxEmpty>}
          {!isPending && showCreateOption && (
            <div
              className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded mx-1 mt-1"
              onClick={handleCreateTag}
            >
              <AddIcon className="size-3" />
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
  );
};
