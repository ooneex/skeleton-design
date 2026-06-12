import { ShieldCheckIcon } from "@/icons/outline/security/sm/ShieldCheckIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusValidBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="success" {...props}>
      <ShieldCheckIcon data-icon="inline-start" />
      {children ?? "Valid"}
    </Badge>
  );
};
