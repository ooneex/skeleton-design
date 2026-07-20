import { Badge } from "@/components/badge/Badge";
import { MediaPlayIcon } from "@/icons/outline/photography-video/sm/MediaPlayIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusEnabledBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="success" {...props}>
      <MediaPlayIcon data-icon="inline-start" />
      {children ?? "Enabled"}
    </Badge>
  );
};

StatusEnabledBadge.displayName = "StatusEnabledBadge";
