import type * as React from "react";
import { useContext } from "react";
import { DotsIcon } from "@/icons/outline/editing/sm/DotsIcon";
import { cn } from "@/utils/cn";
import { ellipsisSizeVariants, PaginationContext } from "./paginationContext";

export const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => {
  const size = useContext(PaginationContext);

  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex items-center justify-center [&_svg:not([class*='size-'])]:size-5",
        ellipsisSizeVariants[size],
        className,
      )}
      {...props}
    >
      <DotsIcon className="size-5" />
    </span>
  );
};

PaginationEllipsis.displayName = "Pagination.Ellipsis";
