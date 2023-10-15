import React, { ReactNode } from "react";
import SidebarBGWrapper from "./SidebarBGWrapper";
import SidebarWrapper from "./SidebarWrapper";

interface MainSidebarProps {
  children: ReactNode;
}

function MainSidebar({ children }: MainSidebarProps) {
  return (
    <SidebarWrapper className="app-sidebar">
      <SidebarBGWrapper>{children}</SidebarBGWrapper>
    </SidebarWrapper>
  );
}

export default MainSidebar;
