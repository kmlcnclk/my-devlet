import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

interface MiniSidebarContainerProps {
  children: ReactNode;

  [x: string]: any;
}

function MiniSidebarContainer({ children }: MiniSidebarContainerProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {children}
    </Box>
  );
}

export default MiniSidebarContainer;
