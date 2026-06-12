import type * as React from "react";
import { cn } from "@/utils/cn";

type InputGroupTextPropsType = React.ComponentProps<"span">;

export const InputGroupText = ({ className, ...props }: InputGroupTextPropsType) => {
  return (
    <span
      className={cn(
        "text-muted-foreground gap-2 text-base [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
};
