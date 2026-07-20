import { Badge } from "@/components/badge/Badge";
import { HourglassIcon } from "@/icons/outline/time/sm/HourglassIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusPendingBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="warning" {...props}>
      <HourglassIcon data-icon="inline-start" />
      {children ?? "Pending"}
    </Badge>
  );
};

StatusPendingBadge.displayName = "StatusPendingBadge";
