import { Link } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "./useSidebar";

type AppSidebarHeaderPropsType = {
  isExpanded: boolean;
};

export const AppSidebarHeader = ({ isExpanded }: AppSidebarHeaderPropsType) => {
  const { isMobile } = useSidebar();
  const showFull = isExpanded || isMobile;

  return (
    <Sidebar.Header className="flex-row items-center justify-between gap-2 px-3 py-3">
      <Link to="/" className="flex min-w-0 items-center" aria-label="Ooneex home">
        {showFull ? (
          <img src="/logo-full.svg" alt="Ooneex" className="h-7 w-auto" />
        ) : (
          <img src="/favicon.svg" alt="Ooneex" className="size-7 shrink-0" />
        )}
      </Link>
      {showFull && <Sidebar.Trigger className="shrink-0" />}
    </Sidebar.Header>
  );
};
