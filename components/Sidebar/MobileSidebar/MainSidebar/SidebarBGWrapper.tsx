import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

interface SidebarBgWrapperProps {
  children: ReactNode;
}

function SidebarBgWrapper({ children }: SidebarBgWrapperProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        borderRight: "1px solid #B0C4E0",
        width: "100%",
        overflow: "auto",
        backgroundColor: "rgba(255, 253, 255, 1)",
        color: "rgba(0, 0, 0, 0.6)",
        // "&:before": {
        //   content: '""',
        //   position: "absolute",
        //   left: 0,
        //   top: 0,
        //   zIndex: 1,
        //   width: "100%",
        //   height: "100%",
        // },
        "& > *": {
          position: "relative",
          zIndex: 3,
        },
      }}
    >
      {children}
    </Box>
  );
}

export default SidebarBgWrapper;
