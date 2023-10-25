import { Box, Typography } from "@mui/material";
import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface Props {
  label: string;
  value: string;
  icon: any;
}

const TextLine: React.FC<Props> = ({ label, value, icon }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: "5px",
      }}
    >
      {icon}
      <Typography
        className={inter.className}
        sx={{
          color: "#666",
          fontWeight: 700,
          fontSize: { xs: "13px", sm: "16px" },
          minWidth: "fit-content",
        }}
      >
        {label}:
      </Typography>
      <Typography
        className={inter.className}
        sx={{
          ml: "10px",
          color: { xs: "#666" },
          fontWeight: 500,
          fontSize: { xs: "11px", sm: "13px" },
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: { xs: "100px", sm: "200px" },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default TextLine;
