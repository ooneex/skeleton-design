import type { Ref } from "react";
import { ChevronRightIcon } from "@/icons/outline/arrows/sm/ChevronRightIcon";
import { chainHandlers } from "@/utils/chainHandlers";
import { cn } from "@/utils/cn";
import { composeRefs } from "@/utils/composeRefs";
import { getMenuItems, useDropdownMenuSubContext } from "./dropdownMenuContext";

type DropdownMenuSubTriggerPropsType = React.ComponentProps<"div"> & {
  inset?: boolean;
  disabled?: boolean;
};

export const DropdownMenuSubTrigger = ({
  className,
  inset,
  disabled,
  children,
  ref,
  onPointerEnter,
  onPointerLeave,
  onClick,
  onKeyDown,
  ...props
}: DropdownMenuSubTriggerPropsType) => {
  const sub = useDropdownMenuSubContext();
  const open = sub?.open ?? false;

  return (
    <div
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={open}
      tabIndex={-1}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      {...(open ? { "data-open": "", "data-popup-open": "" } : {})}
      {...(disabled ? { "data-disabled": "", "aria-disabled": true } : {})}
      ref={composeRefs<HTMLElement>(sub?.triggerRef, ref as Ref<HTMLElement>)}
      onPointerEnter={chainHandlers(onPointerEnter, (event: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return;
        event.currentTarget.focus();
        sub?.cancelClose();
        sub?.setOpen(true);
      })}
      onPointerLeave={chainHandlers(onPointerLeave, () => sub?.scheduleClose())}
      onClick={chainHandlers(onClick, () => {
        if (!disabled) sub?.setOpen(!open);
      })}
      onKeyDown={chainHandlers(onKeyDown, (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || event.key !== "ArrowRight") return;
        event.preventDefault();
        sub?.setOpen(true);
        requestAnimationFrame(() => {
          const popup = sub?.popupRef.current;
          if (popup) (getMenuItems(popup)[0] ?? popup).focus();
        });
      })}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 data-popup-open:bg-accent data-popup-open:text-accent-foreground flex cursor-default items-center outline-hidden select-none data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="size-4 ml-auto" />
    </div>
  );
};

DropdownMenuSubTrigger.displayName = "DropdownMenu.SubTrigger";
