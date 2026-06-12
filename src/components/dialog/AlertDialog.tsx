import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { AlertDialogAction } from "./AlertDialogAction";
import { AlertDialogCancel } from "./AlertDialogCancel";
import { AlertDialogContent } from "./AlertDialogContent";
import { AlertDialogDescription } from "./AlertDialogDescription";
import { AlertDialogFooter } from "./AlertDialogFooter";
import { AlertDialogHeader } from "./AlertDialogHeader";
import { AlertDialogMedia } from "./AlertDialogMedia";
import { AlertDialogOverlay } from "./AlertDialogOverlay";
import { AlertDialogPortal } from "./AlertDialogPortal";
import { AlertDialogTitle } from "./AlertDialogTitle";
import { AlertDialogTrigger } from "./AlertDialogTrigger";

const AlertDialogRoot = (props: AlertDialogPrimitive.Root.Props) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
};

/**
 * Compound component. Sub-components are attached as properties on `AlertDialog`,
 * so a single import exposes the whole API:
 *
 * ```tsx
 * <AlertDialog>
 *   <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
 *   <AlertDialog.Content>
 *     <AlertDialog.Header>
 *       <AlertDialog.Title>Are you sure?</AlertDialog.Title>
 *       <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
 *     </AlertDialog.Header>
 *     <AlertDialog.Footer>
 *       <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
 *       <AlertDialog.Action>Confirm</AlertDialog.Action>
 *     </AlertDialog.Footer>
 *   </AlertDialog.Content>
 * </AlertDialog>
 * ```
 *
 * Open/close state and focus trapping are managed internally by Base UI's
 * AlertDialog primitive, so consumers never wire it up themselves.
 */
export const AlertDialog = Object.assign(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Media: AlertDialogMedia,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
