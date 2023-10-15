import React, { ReactNode } from "react";

import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { routesForMenu } from "@/constants/routes";

interface SidebarWrapperProps {
  children: ReactNode;

  [x: string]: any;
}

function SidebarWrapper({ children, ...rest }: SidebarWrapperProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        position: "relative",
        backgroundColor: "rgba(255, 253, 255, 1)",
        "& .mainContent": {
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: {
            xs: "100%",
            lg: routesForMenu.includes(router.asPath)
              ? "100%"
              : "calc(1750px - 280px)",
          },
          transition: "all 0.5s ease",
          ml: {
            lg: routesForMenu.includes(router.asPath) ? "0px" : "280px",
          },
          padding: "30px",
          pl: {
            xs: "30px",
            md: routesForMenu.includes(router.asPath) ? "30px" : "50px",
          },
          pt: {
            xs: "20px",
            lg: "80px",
          },
        },
        "&.mini-sidebar-collapsed": {
          "& .mainContent": {
            width: {
              lg: routesForMenu.includes(router.asPath)
                ? "100%"
                : "calc(100% - 64px)",
            },
            ml: { lg: "64px" },
          },
          "& .mini-sidebar": {
            "& .nav-item-header, & .nav-item-content, & .menu-badge, & .collapse-children, & .nav-item-icon-arrow-btn":
              {
                display: "none",
              },
            "& .nav-item-icon": {
              mr: 0,
              ml: 0.5,
            },
          },
          "&.appMainFixedHeader .app-bar": {
            width: {
              lg: routesForMenu.includes(router.asPath)
                ? "100%"
                : "calc(100% - 64px)",
            },
          },
          "& .menu-vertical-item": {
            pl: 3,
            "&.standard-menu": {
              mx: 2,
              width: "calc(100% - 16px)",
              pl: 3,
              borderRadius: 1,
              "&.active:after": {
                backgroundColor: "transparent",
              },
            },
          },
          "& .menu-vertical-collapse": {
            pl: 3,
            mx: 2,
            width: "calc(100% - 16px)",
          },
        },
        "&.appMainFixedHeader": {
          pt: { xs: "80px", lg: 0 },
          "& .app-bar": {
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 9,
            width: {
              xs: "100%",
              lg: routesForMenu.includes(router.asPath)
                ? "100%"
                : "calc(100% - 280px)",
            },
          },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default SidebarWrapper;
