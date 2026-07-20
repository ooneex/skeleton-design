import { Badge } from "@/components/badge/Badge";
import { MediaPauseIcon } from "@/icons/outline/photography-video/sm/MediaPauseIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusPausedBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="warning" {...props}>
      <MediaPauseIcon data-icon="inline-start" />
      {children ?? "Paused"}
    </Badge>
  );
};

StatusPausedBadge.displayName = "StatusPausedBadge";
