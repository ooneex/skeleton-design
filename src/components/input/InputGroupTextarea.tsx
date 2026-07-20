import type * as React from "react";
import { Textarea } from "@/components/textarea/Textarea";
import { cn } from "@/utils/cn";

type InputGroupTextareaPropsType = React.ComponentProps<"textarea">;

export const InputGroupTextarea = ({ className, ...props }: InputGroupTextareaPropsType) => {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "rounded-none border-0 bg-transparent py-2 ring-0 focus-visible:ring-0 aria-invalid:ring-0 flex-1 resize-none",
        className,
      )}
      {...props}
    />
  );
};

InputGroupTextarea.displayName = "InputGroup.Textarea";
