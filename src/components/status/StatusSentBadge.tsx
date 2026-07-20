import { Badge } from "@/components/badge/Badge";
import { PaperPlaneIcon } from "@/icons/outline/communication/sm/PaperPlaneIcon";
import type { StatusBadgePropsType } from "./types";

export const StatusSentBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="info" {...props}>
      <PaperPlaneIcon data-icon="inline-start" />
      {children ?? "Sent"}
    </Badge>
  );
};

StatusSentBadge.displayName = "StatusSentBadge";
