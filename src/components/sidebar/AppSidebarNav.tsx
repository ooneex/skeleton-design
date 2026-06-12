import type { FC, SVGProps } from "react";
import { ChartIcon } from "@/icons/outline/charts/md/ChartIcon";
import { FolderIcon } from "@/icons/outline/files-folders/md/FolderIcon";
import { BookIcon } from "@/icons/outline/school-education/md/BookIcon";
import { CalendarIcon } from "@/icons/outline/time/md/CalendarIcon";
import { GearIcon } from "@/icons/outline/ui-layout/md/GearIcon";
import { GridIcon } from "@/icons/outline/ui-layout/md/GridIcon";
import { Sidebar } from "./Sidebar";

type NavItemType = {
  key: string;
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
};

// Placeholder navigation. Wire each item's `render` to a router `<Link />`
// once the corresponding routes exist.
const NAV_ITEMS: NavItemType[] = [
  { key: "dashboard", label: "Dashboard", icon: GridIcon, isActive: true },
  { key: "analytics", label: "Analytics", icon: ChartIcon },
  { key: "library", label: "Library", icon: BookIcon },
  { key: "files", label: "Files", icon: FolderIcon },
  { key: "calendar", label: "Calendar", icon: CalendarIcon },
  { key: "settings", label: "Settings", icon: GearIcon },
];

export const AppSidebarNav = () => {
  return (
    <Sidebar.Group>
      <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Sidebar.MenuItem key={item.key}>
                <Sidebar.MenuButton isActive={item.isActive} tooltip={item.label}>
                  <Icon />
                  <span>{item.label}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            );
          })}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  );
};
