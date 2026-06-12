import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import type React from "react";
import { cn } from "@/utils/cn";
import { SIDEBAR_WIDTH_MOBILE } from "./constants";
import { SidebarContent } from "./SidebarContent";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarGroupAction } from "./SidebarGroupAction";
import { SidebarGroupContent } from "./SidebarGroupContent";
import { SidebarGroupLabel } from "./SidebarGroupLabel";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarInput } from "./SidebarInput";
import { SidebarInset } from "./SidebarInset";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuAction } from "./SidebarMenuAction";
import { SidebarMenuBadge } from "./SidebarMenuBadge";
import { SidebarMenuButton } from "./SidebarMenuButton";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuSkeleton } from "./SidebarMenuSkeleton";
import { SidebarMenuSub } from "./SidebarMenuSub";
import { SidebarMenuSubButton } from "./SidebarMenuSubButton";
import { SidebarMenuSubItem } from "./SidebarMenuSubItem";
import { SidebarProvider } from "./SidebarProvider";
import { SidebarRail } from "./SidebarRail";
import { SidebarSeparator } from "./SidebarSeparator";
import { SidebarTrigger } from "./SidebarTrigger";
import { useSidebar } from "./useSidebar";

type SidebarPropsType = React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

const SidebarRoot = ({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: SidebarPropsType) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn("bg-background text-primary flex h-full w-(--sidebar-width) flex-col", className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <SheetPrimitive.Root open={openMobile} onOpenChange={setOpenMobile}>
        <SheetPrimitive.Portal>
          <SheetPrimitive.Backdrop
            data-slot="sidebar-overlay"
            className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50"
          />
          <SheetPrimitive.Popup
            data-sidebar="sidebar"
            data-slot="sidebar"
            data-mobile="true"
            data-side={side}
            className={cn(
              "bg-background text-primary fixed inset-y-0 z-50 flex h-full w-(--sidebar-width) flex-col p-0",
              "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 transition duration-200 ease-in-out",
              side === "left"
                ? "left-0 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=left]:data-open:slide-in-from-left-10"
                : "right-0 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10",
            )}
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
          >
            <SheetPrimitive.Title className="sr-only">Sidebar</SheetPrimitive.Title>
            <SheetPrimitive.Description className="sr-only">Displays the mobile sidebar.</SheetPrimitive.Description>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetPrimitive.Popup>
        </SheetPrimitive.Portal>
      </SheetPrimitive.Root>
    );
  }

  return (
    <div
      className="group peer text-primary hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "transition-[width] duration-200 ease-linear relative w-(--sidebar-width) bg-transparent",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:-left-(--sidebar-width)"
            : "right-0 group-data-[collapsible=offcanvas]:-right-(--sidebar-width)",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) border-ring group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-background group-data-[variant=floating]:ring-ring group-data-[variant=floating]:rounded group-data-[variant=floating]:ring-1 flex size-full flex-col"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound component. Sub-components are attached as properties on `Sidebar`,
 * so a single import exposes the whole API:
 *
 * ```tsx
 * <Sidebar.Provider>
 *   <Sidebar collapsible="icon">
 *     <Sidebar.Header>…</Sidebar.Header>
 *     <Sidebar.Content>
 *       <Sidebar.Group>
 *         <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
 *         <Sidebar.GroupContent>
 *           <Sidebar.Menu>
 *             <Sidebar.MenuItem>
 *               <Sidebar.MenuButton tooltip="Home">Home</Sidebar.MenuButton>
 *             </Sidebar.MenuItem>
 *           </Sidebar.Menu>
 *         </Sidebar.GroupContent>
 *       </Sidebar.Group>
 *     </Sidebar.Content>
 *     <Sidebar.Footer>…</Sidebar.Footer>
 *     <Sidebar.Rail />
 *   </Sidebar>
 *   <Sidebar.Inset>…</Sidebar.Inset>
 * </Sidebar.Provider>
 * ```
 *
 * Shared open/collapsed state lives in `Sidebar.Provider`; read it anywhere
 * below with the `useSidebar` hook.
 */
export const Sidebar = Object.assign(SidebarRoot, {
  Provider: SidebarProvider,
  Trigger: SidebarTrigger,
  Rail: SidebarRail,
  Inset: SidebarInset,
  Input: SidebarInput,
  Header: SidebarHeader,
  Footer: SidebarFooter,
  Separator: SidebarSeparator,
  Content: SidebarContent,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
  MenuButton: SidebarMenuButton,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuSkeleton: SidebarMenuSkeleton,
  MenuSub: SidebarMenuSub,
  MenuSubItem: SidebarMenuSubItem,
  MenuSubButton: SidebarMenuSubButton,
});
