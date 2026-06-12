import type * as React from "react";
import { useContext } from "react";
import { ChevronRightIcon } from "@/icons/outline/arrows/sm/ChevronRightIcon";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";
import { linkIconSizeVariants, PaginationContext } from "./paginationContext";

export const PaginationNext = ({ className, ...props }: React.ComponentProps<"a">) => {
  const size = useContext(PaginationContext);

  return (
    <Button
      variant="ghost"
      size={linkIconSizeVariants[size]}
      className={cn("rounded-full", className)}
      aria-label="Go to next page"
      nativeButton={false}
      render={
        <a data-slot="pagination-next" {...props}>
          <ChevronRightIcon data-icon="inline-end" className="size-5" />
        </a>
      }
    />
  );
};
