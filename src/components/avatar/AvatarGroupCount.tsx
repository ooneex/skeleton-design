import type * as React from "react";
import { cn } from "@/utils/cn";

type AvatarGroupCountPropsType = React.ComponentProps<"div">;
export const AvatarGroupCount = ({ className, ...props }: AvatarGroupCountPropsType) => {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "bg-muted text-muted-foreground size-8 rounded-full text-sm group-has-data-[size=md]/avatar-group:size-10 group-has-data-[size=xs]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=md]/avatar-group:[&>svg]:size-5 group-has-data-[size=xs]/avatar-group:[&>svg]:size-3 ring-background relative flex shrink-0 items-center justify-center ring-2",
        className,
      )}
      {...props}
    />
  );
};
