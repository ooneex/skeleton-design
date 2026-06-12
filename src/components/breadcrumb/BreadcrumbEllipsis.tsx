import type { ComponentProps } from "react";
import { DotsIcon } from "@/icons/outline/editing/sm/DotsIcon";
import { cn } from "@/utils/cn";

export const BreadcrumbEllipsis = ({ className, ...props }: ComponentProps<"span">) => {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("size-5 [&>svg]:size-4 flex items-center justify-center", className)}
      {...props}
    >
      <DotsIcon />
      <span className="sr-only">More</span>
    </span>
  );
};
