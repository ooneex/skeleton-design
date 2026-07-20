import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/utils/cn";

export const SheetTitle = ({ className, ...props }: SheetPrimitive.Title.Props) => {
  return (
    <SheetPrimitive.Title data-slot="sheet-title" className={cn("text-foreground font-medium", className)} {...props} />
  );
};
SheetTitle.displayName = "SheetTitle";
