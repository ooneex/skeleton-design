import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { PopoverContent } from "./PopoverContent";
import { PopoverDescription } from "./PopoverDescription";
import { PopoverHeader } from "./PopoverHeader";
import { PopoverTitle } from "./PopoverTitle";
import { PopoverTrigger } from "./PopoverTrigger";

const PopoverRoot = (props: PopoverPrimitive.Root.Props) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
};

/**
 * Popover compound component.
 *
 * Use the attached sub-components (`Popover.Trigger`, `Popover.Content`,
 * `Popover.Header`, `Popover.Title`, `Popover.Description`) to compose a
 * popover.
 */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Header: PopoverHeader,
  Title: PopoverTitle,
  Description: PopoverDescription,
});
