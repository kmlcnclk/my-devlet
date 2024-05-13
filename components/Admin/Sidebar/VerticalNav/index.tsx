import React from "react";
import List from "@mui/material/List";

import { routesConfig } from "@/constants/admin/routes";

import VerticalItem from "./VerticalItem";

import Box from "@mui/material/Box";

function VerticalNav() {
  return (
    <List
      sx={{
        position: "relative",
        padding: 0,
      }}
      component="div"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "30px",
        }}
      >
        <Box
          component="img"
          src="/images/rcaiot-logo.png"
          sx={{
            width: "250px",
            background: "#f3f3f3",
            height: "100px",
            borderRadius: "20px",
            p: "10px",
            objectFit: "contain",
          }}
        />
      </Box>

      {routesConfig.map((item: any) => {
        return (
          <React.Fragment key={item.id}>
            <VerticalItem item={item} />
          </React.Fragment>
        );
      })}
    </List>
  );
}

export default VerticalNav;
