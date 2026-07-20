import { useRegisterDialogTitle } from "@/components/dialog/useDialogPresence";
import { cn } from "@/utils/cn";

export const DrawerTitle = ({ className, id, ...props }: React.ComponentProps<"h2">) => {
  const titleId = useRegisterDialogTitle();
  return (
    <h2
      id={id ?? titleId}
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
};
DrawerTitle.displayName = "DrawerTitle";
