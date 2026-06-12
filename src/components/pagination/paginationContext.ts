import type * as React from "react";
import { createContext } from "react";
import type { Button } from "@/components/button/Button";

export type PaginationSizeType = "xs" | "sm" | "md" | "lg";

export const PaginationContext = createContext<PaginationSizeType>("md");

export const contentGapVariants: Record<PaginationSizeType, string> = {
  xs: "gap-0",
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1.5",
};

export const linkIconSizeVariants: Record<PaginationSizeType, React.ComponentProps<typeof Button>["size"]> = {
  xs: "icon-xs",
  sm: "icon-sm",
  md: "icon",
  lg: "icon-lg",
};

export const ellipsisSizeVariants: Record<PaginationSizeType, string> = {
  xs: "size-6",
  sm: "size-8",
  md: "size-9",
  lg: "size-10",
};

export const linkTextSizeVariants: Record<PaginationSizeType, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};
