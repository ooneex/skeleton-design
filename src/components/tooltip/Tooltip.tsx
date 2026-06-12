import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { TooltipContent } from "./TooltipContent";
import { TooltipProvider } from "./TooltipProvider";
import { TooltipTrigger } from "./TooltipTrigger";

const TooltipRoot = ({ ...props }: TooltipPrimitive.Root.Props) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
};

/**
 * Tooltip compound component.
 *
 * The root already wraps its children in a `Tooltip.Provider`. Use the
 * attached sub-components (`Tooltip.Trigger`, `Tooltip.Content`, etc.) to
 * compose a tooltip.
 */
export const Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});
