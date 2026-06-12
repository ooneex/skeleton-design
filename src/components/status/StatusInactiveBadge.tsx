import { CircleMediaStopIcon } from "@/icons/outline/photography-video/sm/CircleMediaStopIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusInactiveBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="neutral" {...props}>
      <CircleMediaStopIcon data-icon="inline-start" />
      {children ?? "Inactive"}
    </Badge>
  );
};
