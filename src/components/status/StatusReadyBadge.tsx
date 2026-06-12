import { BadgeCheckIcon } from "@/icons/outline/ui-layout/sm/BadgeCheckIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusReadyBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="success" {...props}>
      <BadgeCheckIcon data-icon="inline-start" />
      {children ?? "Ready"}
    </Badge>
  );
};
