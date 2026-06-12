import { CircleMinusIcon } from "@/icons/outline/ui-layout/sm/CircleMinusIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusCancelledBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="neutral" {...props}>
      <CircleMinusIcon data-icon="inline-start" />
      {children ?? "Cancelled"}
    </Badge>
  );
};
