import { MediaRecordIcon } from "@/icons/outline/photography-video/sm/MediaRecordIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusActiveBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="success" {...props}>
      <MediaRecordIcon data-icon="inline-start" />
      {children ?? "Active"}
    </Badge>
  );
};
