import { Editor } from "@/components/editor/Editor";
import { cn } from "@/utils/cn";

type InputDescriptionPropsType = {
  content?: string;
  placeholder?: string;
  onContentChange?: (content: string | undefined) => void;
  className?: string;
};

export const InputDescription = ({
  content = "",
  placeholder,
  onContentChange,
  className,
}: InputDescriptionPropsType) => {
  return (
    <Editor
      content={content}
      placeholder={placeholder}
      onContentChange={(value) => onContentChange?.(value || undefined)}
      className={cn("min-h-20 ring ring-ring-active focus-within:ring-ring-active rounded p-2", className)}
      showSlashMenu={false}
      showHeadings={false}
      showHistory={false}
      showMedia={false}
      showToolbar={false}
    />
  );
};

InputDescription.displayName = "InputDescription";
