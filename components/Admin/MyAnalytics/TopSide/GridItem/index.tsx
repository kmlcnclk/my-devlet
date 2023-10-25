import React from "react";
import Box from "@mui/material/Box";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  bgColor: string;
  label: string;
  value: string;
  percentage: string;
}

const GridItem: React.FC<Props> = ({
  bgColor,
  label,
  value,
  percentage,
}: Props) => {
  return (
    <Grid item lg={3} sm={6} xs={12}>
      <Box
        sx={{
          height: "180px",
          py: "30px",
          px: "20px",
          backgroundColor: bgColor,
          boxShadow: "0px 3px 20px 5px #0000001A",
          borderRadius: "20px",
          border: "1px solid #999",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Typography
          className={inter.className}
          sx={{
            color: "#666666",
            fontWeight: 500,
            fontSize: "20px",
            mb: "10px",
          }}
        >
          {label}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className={inter.className}
            sx={{
              color: "#666666",
              fontWeight: 700,
              fontSize: { xs: "21px", sm: "23px", lg: "21px", xl: "23px" },
              pr: "10px",
            }}
          >
            {value}
          </Typography>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TrendingUpIcon sx={{ color: "#22bb33" }} />
            <Typography
              className={inter.className}
              sx={{
                color: "#22bb33",
                fontWeight: 500,
                fontSize: "17px",
              }}
            >
              {percentage}%
            </Typography>
          </Box> */}
        </Box>
      </Box>
    </Grid>
  );
};

export default GridItem;
