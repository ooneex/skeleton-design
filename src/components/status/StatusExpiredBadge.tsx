import { EyeSlashIcon } from "@/icons/outline/ui-layout/sm/EyeSlashIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusExpiredBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="danger" {...props}>
      <EyeSlashIcon data-icon="inline-start" />
      {children ?? "Expired"}
    </Badge>
  );
};
