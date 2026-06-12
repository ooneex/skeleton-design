import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export const BreadcrumbList = ({ className, ...props }: ComponentProps<"ol">) => {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground gap-1.5 text-sm sm:gap-2.5 flex flex-wrap items-center wrap-break-word leading-relaxed",
        className,
      )}
      {...props}
    />
  );
};
