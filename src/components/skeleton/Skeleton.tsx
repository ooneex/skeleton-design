import type * as React from "react";
import { cn } from "@/utils/cn";

type SkeletonPropsType = React.ComponentProps<"div">;

export const Skeleton = ({ className, ...props }: SkeletonPropsType) => {
  return <div data-slot="skeleton" className={cn("bg-muted rounded animate-pulse", className)} {...props} />;
};

Skeleton.displayName = "Skeleton";
