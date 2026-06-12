import type * as React from "react";
import { cn } from "@/utils/cn";

type AvatarGroupPropsType = React.ComponentProps<"div">;
export const AvatarGroup = ({ className, ...props }: AvatarGroupPropsType) => {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "*:data-[slot=avatar]:ring-background group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2",
        className,
      )}
      {...props}
    />
  );
};
