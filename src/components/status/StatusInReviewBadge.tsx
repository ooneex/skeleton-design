import { EyeIcon } from "@/icons/outline/ui-layout/sm/EyeIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusInReviewBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="info" {...props}>
      <EyeIcon data-icon="inline-start" />
      {children ?? "In Review"}
    </Badge>
  );
};
