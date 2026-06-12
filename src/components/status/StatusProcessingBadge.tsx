import { SpinnerLoaderIcon } from "@/icons/outline/loaders/sm/SpinnerLoaderIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusProcessingBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="info" {...props}>
      <SpinnerLoaderIcon data-icon="inline-start" />
      {children ?? "Processing"}
    </Badge>
  );
};
