import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

interface SidebarWrapperProps {
  children: ReactNode;

  [x: string]: any;
}

function SidebarWrapper({ children, ...rest }: SidebarWrapperProps) {
  return (
    <Box
      sx={{
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        position: { xs: "relative", lg: "fixed" },
        top: 0,
        left: 0,
        zIndex: 1101,
        width: 280,
        maxHeight: "100vh",
        height: "100%",
        transition: "all 0.4s ease",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default SidebarWrapper;
