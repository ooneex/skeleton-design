import { TrashIcon } from "@/icons/outline/ui-layout/sm/TrashIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusDeletedBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="danger" {...props}>
      <TrashIcon data-icon="inline-start" />
      {children ?? "Deleted"}
    </Badge>
  );
};
