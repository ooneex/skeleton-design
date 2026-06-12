import { TriangleWarningIcon } from "@/icons/outline/ui-layout/sm/TriangleWarningIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusInvalidBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="danger" {...props}>
      <TriangleWarningIcon data-icon="inline-start" />
      {children ?? "Invalid"}
    </Badge>
  );
};
