import type * as React from "react";
import { cn } from "@/utils/cn";

type AvatarBadgePropsType = React.ComponentProps<"span">;
export const AvatarBadge = ({ className, ...props }: AvatarBadgePropsType) => {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=md]/avatar:size-2.5 group-data-[size=md]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        "group-data-[size=xl]/avatar:size-4 group-data-[size=xl]/avatar:[&>svg]:size-2.5 group-data-[size=xl]/avatar:ring-3 group-data-[size=xl]/avatar:right-2 group-data-[size=xl]/avatar:bottom-2",
        className,
      )}
      {...props}
    />
  );
};
