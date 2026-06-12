import { HourglassIcon } from "@/icons/outline/time/sm/HourglassIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusQueuedBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="neutral" {...props}>
      <HourglassIcon data-icon="inline-start" />
      {children ?? "Queued"}
    </Badge>
  );
};
