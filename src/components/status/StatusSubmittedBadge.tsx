import { PaperPlaneIcon } from "@/icons/outline/communication/sm/PaperPlaneIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusSubmittedBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="info" {...props}>
      <PaperPlaneIcon data-icon="inline-start" />
      {children ?? "Submitted"}
    </Badge>
  );
};
