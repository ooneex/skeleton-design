import type * as React from "react";
import { useContext } from "react";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";
import { chevronIconMap, chevronIconSizeVariants, linkIconSizeVariants, PaginationContext } from "./paginationContext";

export const PaginationNext = ({ className, ...props }: React.ComponentProps<"a">) => {
  const size = useContext(PaginationContext);
  const { ChevronRightIcon } = chevronIconMap[size];

  return (
    <Button
      variant="ghost"
      size={linkIconSizeVariants[size]}
      className={cn("rounded-full", className)}
      aria-label="Go to next page"
      nativeButton={false}
      render={
        <a data-slot="pagination-next" {...props}>
          <ChevronRightIcon data-icon="inline-end" className={chevronIconSizeVariants[size]} />
        </a>
      }
    />
  );
};

PaginationNext.displayName = "Pagination.Next";
