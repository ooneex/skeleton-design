import { ClockIcon } from "@/icons/outline/time/sm/ClockIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusOnHoldBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="warning" {...props}>
      <ClockIcon data-icon="inline-start" />
      {children ?? "On Hold"}
    </Badge>
  );
};
