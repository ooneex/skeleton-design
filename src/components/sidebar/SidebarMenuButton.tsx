import { mergeProps } from "@base-ui/react/merge-props";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/utils/cn";
import { useSidebar } from "./useSidebar";

export const sidebarMenuButtonVariants = cva(
  "ring-ring hover:bg-muted hover:text-primary active:bg-muted active:text-primary data-active:bg-muted data-active:text-primary data-open:hover:bg-muted data-open:hover:text-primary gap-2 rounded p-2 text-left text-sm group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 data-active:font-medium peer/menu-button flex w-full items-center overflow-hidden outline-hidden group/menu-button disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-muted hover:text-primary",
        outline: "bg-background hover:bg-muted hover:text-primary ring-1 ring-ring hover:ring-muted",
      },
      size: {
        xs: "h-6 text-xs",
        sm: "h-7 text-xs",
        md: "h-8 text-sm",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type SidebarMenuButtonPropsType = useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipPrimitive.Popup>;
  } & VariantProps<typeof sidebarMenuButtonVariants>;

export const SidebarMenuButton = ({
  render,
  isActive = false,
  variant = "default",
  size = "md",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonPropsType) => {
  const { isMobile, state } = useSidebar();
  const showTooltip = tooltip && state === "collapsed" && !isMobile;

  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props,
    ),
    render: showTooltip
      ? (renderProps, renderState) => (
          <TooltipPrimitive.Trigger render={<span />}>
            {typeof render === "function" ? (
              render(renderProps, renderState)
            ) : (
              <button type="button" {...renderProps} />
            )}
          </TooltipPrimitive.Trigger>
        )
      : render,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  });

  if (!showTooltip) {
    return comp;
  }

  const tooltipProps = typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <TooltipPrimitive.Root>
      {comp}
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner side="right" sideOffset={4} align="center" className="isolate z-50">
          <TooltipPrimitive.Popup
            data-slot="tooltip-content"
            className="rounded px-3 py-1.5 text-sm bg-background text-primary z-50 w-fit max-w-xs origin-(--transform-origin) font-normal shadow-md shadow-black/20"
            {...tooltipProps}
          />
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};
