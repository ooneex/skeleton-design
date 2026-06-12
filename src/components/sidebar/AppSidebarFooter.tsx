import { RectLogoutIcon } from "@/icons/outline/arrows/md/RectLogoutIcon";
import { Sidebar } from "./Sidebar";

type AppSidebarFooterPropsType = {
  isExpanded: boolean;
};

// Static, presentational account block. Wire to the auth provider
// (user data + sign-out action) once it is available.
const USER = {
  name: "Ooneex",
  email: "contact@ooneex.com",
};

export const AppSidebarFooter = ({ isExpanded }: AppSidebarFooterPropsType) => {
  const initials = USER.name.slice(0, 2).toUpperCase();

  return (
    <Sidebar.Footer>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton size="lg" tooltip={USER.name} className="gap-3">
            <span className="bg-muted text-primary flex size-8 shrink-0 items-center justify-center rounded text-xs font-medium">
              {initials}
            </span>
            {isExpanded && (
              <span className="flex min-w-0 flex-col text-left leading-tight">
                <span className="truncate text-sm font-medium">{USER.name}</span>
                <span className="text-primary/60 truncate text-xs">{USER.email}</span>
              </span>
            )}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton tooltip="Sign out">
            <RectLogoutIcon />
            <span>Sign out</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Footer>
  );
};
