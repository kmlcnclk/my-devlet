import React, { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

interface AppGridContainerProps {
  children: ReactNode;

  [x: string]: any;
}

function AppGridContainer({ children, ...others }: AppGridContainerProps) {
  const isMDDown = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  return (
    <Grid container spacing={isMDDown ? 5 : 8} {...others}>
      {children}
    </Grid>
  );
}

export default AppGridContainer;
