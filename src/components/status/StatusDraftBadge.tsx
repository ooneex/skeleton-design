import { PenIcon } from "@/icons/outline/communication/sm/PenIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusDraftBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="neutral" {...props}>
      <PenIcon data-icon="inline-start" />
      {children ?? "Draft"}
    </Badge>
  );
};
