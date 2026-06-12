import { ArchiveIcon } from "@/icons/outline/files-folders/sm/ArchiveIcon";
import { Badge } from "@/components/badge/Badge";
import type { StatusBadgePropsType } from "./types";

export const StatusArchivedBadge = ({ children, ...props }: StatusBadgePropsType) => {
  return (
    <Badge variant="neutral" {...props}>
      <ArchiveIcon data-icon="inline-start" />
      {children ?? "Archived"}
    </Badge>
  );
};
