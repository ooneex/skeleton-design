import { CheckboxCheckedIcon } from "@/icons/outline/ui-layout/sm/CheckboxCheckedIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusReviewedBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="success" {...props}>
      <CheckboxCheckedIcon data-icon="inline-start" />
      {children ?? "Reviewed"}
    </Badge>
  );
};
