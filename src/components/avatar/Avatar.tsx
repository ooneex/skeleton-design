import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@/utils/cn";
import { AvatarBadge } from "./AvatarBadge";
import { AvatarFallback } from "./AvatarFallback";
import { AvatarGroup } from "./AvatarGroup";
import { AvatarGroupCount } from "./AvatarGroupCount";
import { AvatarImage } from "./AvatarImage";

type AvatarPropsType = AvatarPrimitive.Root.Props & { size?: "md" | "sm" | "lg" | "xl" };
const AvatarRoot = ({ className, size = "md", ...props }: AvatarPropsType) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "size-8 rounded-full after:rounded-full data-[size=lg]:size-10 data-[size=xl]:size-28 data-[size=sm]:size-6 after:border-border group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:mix-blend-darken",
        className,
      )}
      {...props}
    />
  );
};

/**
 * Avatar is a compound component: its sub-components are attached as properties
 * (Image, Fallback, Badge, Group, GroupCount) so a single import exposes the
 * whole API (e.g. `<Avatar><Avatar.Image /><Avatar.Fallback /></Avatar>`).
 */
export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Badge: AvatarBadge,
  Group: AvatarGroup,
  GroupCount: AvatarGroupCount,
});
