import { Badge } from "@/components/badge/Badge";
import { StopwatchIcon } from "@/icons/outline/time/sm/StopwatchIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusTimeoutBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="danger" {...props}>
      <StopwatchIcon data-icon="inline-start" />
      {children ?? "Timeout"}
    </Badge>
  );
};

StatusTimeoutBadge.displayName = "StatusTimeoutBadge";
