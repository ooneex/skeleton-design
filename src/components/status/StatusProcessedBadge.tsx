import { Badge } from "@/components/badge/Badge";
import { CircleCheckIcon } from "@/icons/outline/ui-layout/sm/CircleCheckIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusProcessedBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="success" {...props}>
      <CircleCheckIcon data-icon="inline-start" />
      {children ?? "Processed"}
    </Badge>
  );
};

StatusProcessedBadge.displayName = "StatusProcessedBadge";
