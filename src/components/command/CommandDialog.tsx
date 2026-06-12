import type { ComponentProps, ReactNode } from "react";
import { Dialog } from "@/components/dialog/Dialog";
import { cn } from "@/utils/cn";

type CommandDialogPropsType = Omit<ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: ReactNode;
};

/** Command palette rendered inside a `Dialog` with a screen-reader-only header. */
export const CommandDialog = ({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: CommandDialogPropsType) => {
  return (
    <Dialog {...props}>
      <Dialog.Header className="sr-only">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Content
        className={cn("rounded-xl! top-12 translate-y-0 overflow-hidden p-0 shadow-2xl border-border/50", className)}
        showCloseButton={showCloseButton}
      >
        {children}
      </Dialog.Content>
    </Dialog>
  );
};
