import { XmarkIcon } from "@/icons/outline/ui-layout/sm/XmarkIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusRejectedBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="danger" {...props}>
      <XmarkIcon data-icon="inline-start" />
      {children ?? "Rejected"}
    </Badge>
  );
};
