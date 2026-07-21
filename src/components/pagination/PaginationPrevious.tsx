import type * as React from "react";
import { useContext } from "react";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";
import { chevronIconMap, chevronIconSizeVariants, linkIconSizeVariants, PaginationContext } from "./paginationContext";

export const PaginationPrevious = ({ className, ...props }: React.ComponentProps<"a">) => {
  const size = useContext(PaginationContext);
  const { ChevronLeftIcon } = chevronIconMap[size];

  return (
    <Button
      variant="ghost"
      size={linkIconSizeVariants[size]}
      className={cn("rounded-full", className)}
      aria-label="Go to previous page"
      nativeButton={false}
      render={
        <a data-slot="pagination-previous" {...props}>
          <ChevronLeftIcon data-icon="inline-start" className={chevronIconSizeVariants[size]} />
        </a>
      }
    />
  );
};

PaginationPrevious.displayName = "Pagination.Previous";
