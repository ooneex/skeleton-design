import type { ComponentProps } from "react";
import { ChevronRightIcon } from "@/icons/outline/arrows/sm/ChevronRightIcon";
import { cn } from "@/utils/cn";

export const BreadcrumbSeparator = ({ children, className, ...props }: ComponentProps<"li">) => {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
};
