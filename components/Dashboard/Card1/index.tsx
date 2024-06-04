import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button, Grid } from "@mui/material";

function Card1() {
  const data = [
    {
      value: "Education",
      url: "/dashboard/educational-background",
    },
    {
      value: "Bank",
      url: "/dashboard/bank-background",
    },
    {
      value: "Hospital",
      url: "/dashboard/hospital-background",
    },
    {
      value: "Notary",
      url: "/dashboard/notary",
    },
    {
      value: "Tax Debt",
      url: "/dashboard/tax-debt",
    },
    {
      value: "Criminal Record",
      url: "/dashboard/criminal-record",
    },
    {
      value: "Asset",
      url: "/dashboard/asset",
    },
    {
      value: "Military",
      url: "/dashboard/military",
    },
    {
      value: "Subscription Transaction",
      url: "/dashboard/subscription-transaction",
    },
    {
      value: "Traffic Debt",
      url: "/dashboard/traffic-debt",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "210px",
        bgcolor: "#F2FDFF",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: "30px",
        mt: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mb: "5px",
        }}
      >
        <Typography
          sx={{ color: "#666666", fontSize: "20px", fontWeight: "600" }}
        >
          View your infos
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          mt: "20px",
        }}
      >
        {data.map((d, i) => (
          <Grid item xs={12} sm={4} md={3} key={i}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link
                href={d.url}
                style={{
                  width: "100%",
                }}
              >
                <Button
                  sx={{
                    color: "#FFFDFF",
                    fontWeight: "500",
                    fontSize: "15px",
                    height: "45px",
                    width: "100%",
                    borderRadius: "10px",
                    bgcolor: "#317DED",
                    border: "2px solid #317DED",
                    boxShadow: "0px 4px 10px 0px #00000040",
                  }}
                  variant="contained"
                >
                  <Typography sx={{ fontSize: "14px", textDecoration: "none" }}>
                    {d.value}
                  </Typography>
                </Button>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mb: "5px",
          mt: "50px",
        }}
      >
        <Typography
          sx={{ color: "#666666", fontSize: "20px", fontWeight: "600" }}
        >
          Create a Smart Contract
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          mt: "20px",
        }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Link href="/dashboard/smart-contract">
              <Button
                sx={{
                  color: "#FFFDFF",
                  fontWeight: "500",
                  fontSize: "15px",
                  height: "45px",
                  width: "100%",
                  borderRadius: "10px",

                  border: "2px solid #d946ef",
                  boxShadow: "0px 4px 10px 0px #00000040",
                  background: "#d946ef",
                  "&:hover": {
                    background: "#c026d3",
                  },
                }}
                variant="contained"
              >
                <Typography sx={{ fontSize: "14px", textDecoration: "none" }}>
                  Create Smart Contract
                </Typography>
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Card1;
