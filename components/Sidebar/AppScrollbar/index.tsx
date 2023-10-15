import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const StyledSimpleBarReact = styled(SimpleBarReact)(() => ({
  height: "100%",
  width: "100%",
}));

interface AppScrollbarProps {
  children: ReactNode;
  className?: string;

  [x: string]: any;
}

function AppScrollbar(props: AppScrollbarProps) {
  const { children, ...others } = props;

  return <StyledSimpleBarReact {...others}>{children}</StyledSimpleBarReact>;
}

export default AppScrollbar;
