import React, { ReactNode } from "react";
import ListItem from "@mui/material/ListItem";
import Fonts from "../../../../constants/fonts";
import clsx from "clsx";
import { alpha } from "@mui/material";

interface VerticalNavItemProps {
  children: ReactNode;

  [x: string]: any;
}

function VerticalNavItem({ children, active, ...rest }: VerticalNavItemProps) {
  return (
    <ListItem
      className={clsx("nav-item menu-vertical-item standard-menu")}
      sx={{
        height: 40,
        my: 0.25,
        cursor: "pointer",
        textDecoration: "none !important",
        mx: 2,
        width: "calc(100% - 16px)",
        pr: 3,
        borderRadius: 1,
        position: "relative",
        transition: "all 0.4s ease",
        whiteSpace: "nowrap",
        "& .nav-item-icon": {
          color: alpha("rgba(0, 0, 0, 0.60)", 0.7),
          fontSize: 20,
          display: "block",
        },
        "& .nav-item-text": {
          color: alpha("rgba(0, 0, 0, 0.60)", 0.7),
          fontWeight: Fonts.MEDIUM,
          fontSize: 14,
        },

        "& .MuiTouchRipple-root": {
          zIndex: 1,
        },
        "&.nav-item-header": {
          textTransform: "uppercase",
        },
        "&:hover, &:focus": {
          "& .nav-item-text, & .nav-item-icon, & .nav-item-icon-arrow": {
            color: "rgba(0, 0, 0, 0.60)",
          },
        },
        "&.standard-menu": {
          mx: 0,
          width: "100%",
          pr: 3,
          borderRadius: 0,
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: 4,
            backgroundColor: "transparent",
          },
          "&.active:after": {
            backgroundColor: (theme) => theme.palette.primary.main,
          },
        },
      }}
      {...rest}
    >
      {children}
    </ListItem>
  );
}

export default VerticalNavItem;
