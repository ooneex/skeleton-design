import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import type { badgeVariants } from "@/components/badge/Badge";

export type StatusBadgePropsType = Omit<HTMLAttributes<HTMLSpanElement>, "children"> &
  Omit<VariantProps<typeof badgeVariants>, "variant"> & {
    children?: React.ReactNode;
  };
