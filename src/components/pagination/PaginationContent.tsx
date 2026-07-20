import type * as React from "react";
import { useContext } from "react";
import { cn } from "@/utils/cn";
import { contentGapVariants, PaginationContext } from "./paginationContext";

export const PaginationContent = ({ className, ...props }: React.ComponentProps<"ul">) => {
  const size = useContext(PaginationContext);

  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center", contentGapVariants[size], className)}
      {...props}
    />
  );
};

PaginationContent.displayName = "Pagination.Content";
