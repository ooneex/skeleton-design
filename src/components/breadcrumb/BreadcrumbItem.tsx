import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export const BreadcrumbItem = ({ className, ...props }: ComponentProps<"li">) => {
  return <li data-slot="breadcrumb-item" className={cn("gap-1.5 inline-flex items-center", className)} {...props} />;
};
