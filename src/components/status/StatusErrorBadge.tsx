import { Badge } from "@/components/badge/Badge";
import { TriangleWarningIcon } from "@/icons/outline/ui-layout/sm/TriangleWarningIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusErrorBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="danger" {...props}>
      <TriangleWarningIcon data-icon="inline-start" />
      {children ?? "Error"}
    </Badge>
  );
};

StatusErrorBadge.displayName = "StatusErrorBadge";
