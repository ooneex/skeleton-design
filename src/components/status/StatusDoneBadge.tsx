import { Badge } from "@/components/badge/Badge";
import { CheckIcon } from "@/icons/outline/ui-layout/sm/CheckIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusDoneBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="success" {...props}>
      <CheckIcon data-icon="inline-start" />
      {children ?? "Done"}
    </Badge>
  );
};

StatusDoneBadge.displayName = "StatusDoneBadge";
