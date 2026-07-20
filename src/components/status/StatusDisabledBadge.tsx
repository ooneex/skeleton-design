import { Badge } from "@/components/badge/Badge";
import { BanIcon } from "@/icons/outline/ui-layout/sm/BanIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusDisabledBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="neutral" {...props}>
      <BanIcon data-icon="inline-start" />
      {children ?? "Disabled"}
    </Badge>
  );
};

StatusDisabledBadge.displayName = "StatusDisabledBadge";
