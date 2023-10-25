import React from "react";
import OnBoarding from "./OnBoarding";
import { Box } from "@mui/material";

interface Props {}

const SmartContract: React.FC<Props> = ({}: Props) => {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <OnBoarding />
    </Box>
  );
};

export default SmartContract;
