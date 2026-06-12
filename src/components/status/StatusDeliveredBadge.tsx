import { CheckDoubleIcon } from "@/icons/outline/ui-layout/sm/CheckDoubleIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusDeliveredBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="success" {...props}>
      <CheckDoubleIcon data-icon="inline-start" />
      {children ?? "Delivered"}
    </Badge>
  );
};
