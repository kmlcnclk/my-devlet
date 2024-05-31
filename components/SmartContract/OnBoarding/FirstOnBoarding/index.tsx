import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface Props {
  setStateOfOnBoarding: Function;
  inputs: {
    name: string;
    network: string;
  };
  setInputs: Function;
}

const FirstOnBoarding: React.FC<Props> = ({
  setStateOfOnBoarding,
  inputs,
  setInputs,
}: Props) => {
  const submitFunc = (e: any) => {
    e.preventDefault();
    setStateOfOnBoarding("second");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        component="form"
        onSubmit={submitFunc}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#edebeb",
          p: { xs: "30px", md: "40px" },
          borderRadius: "20px",
          width: "400px",
          height: "auto",
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
        }}
      >
        <Box
          component="img"
          src="/images/neu.png"
          sx={{ width: "90px", objectFit: "contain", mb: "10px" }}
        />
        <Typography
          className={inter.className}
          sx={{
            color: "#666666",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Smart Contract Wizard
        </Typography>

        <Box
          sx={{
            width: "100%",
            mt: "30px",
          }}
        >
          <Typography
            className={inter.className}
            sx={{
              color: "#666666",
              fontWeight: 500,
              fontSize: "15px",
              mb: "4px",
              pl: "4px",
            }}
          >
            Smart Contract Name
          </Typography>

          <TextField
            required
            value={inputs.name}
            onChange={(e) => {
              setInputs((prev: any) => {
                let updatedPrev = { ...prev };
                updatedPrev.name = e.target.value;
                return updatedPrev;
              });
            }}
            id="name"
            label="Required"
            variant="outlined"
            className={inter.className}
            sx={{
              mt: "10px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "11px !important",
              },
              "& input": {
                width: "100% !important",
                height: "37px",
                bgcolor: "#F8F9F8",
                p: "0px",
                borderRadius: "11px",
                color: "#666666",
                px: "13px",
                boxShadow: "0px 3px 20px 0px #0000001A",
                "&:focus": {
                  outline: "none",
                },
              },
              "& label": {
                mt: "-9px",
              },
              "& .Mui-focused": {
                mt: "0px !important",
              },
              "& .MuiFormLabel-filled": {
                mt: "0px !important",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            mt: "20px",
          }}
        >
          <Typography
            className={inter.className}
            sx={{
              color: "#666666",
              fontWeight: 500,
              fontSize: "15px",
              mb: "4px",
              pl: "4px",
            }}
          >
            Choose Your Network: (The most popular network is BNB Chain)
          </Typography>

          <Select
            required
            value={inputs.network}
            onChange={(e) => {
              setInputs((prev: any) => {
                let updatedPrev = { ...prev };
                updatedPrev.network = e.target.value;
                return updatedPrev;
              });
            }}
            className={inter.className}
            sx={{
              width: "100%",
              height: "37px",
              borderRadius: "10px",
              bgcolor: "#F8F9F8",
              fontWeight: "400",
              fontSize: "13px",
            }}
          >
            <MenuItem
              value="Binance Smart Chain"
              sx={{
                color: "#666666",
                fontWeight: "400",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
              }}
              className={inter.className}
            >
              <Box
                component="img"
                src="/images/bnb-logo.png"
                sx={{
                  width: "12px",
                  objectFit: "contain",
                  mr: "8px",
                  mb: "-1px",
                }}
              />
              <Typography
                className={inter.className}
                sx={{
                  color: "#666666",
                  fontWeight: 500,
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                Binance Smart Chain
              </Typography>
            </MenuItem>
            <MenuItem
              value="Binance Smart Chain Testnet"
              sx={{
                color: "#666666",
                fontWeight: "400",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
              }}
              className={inter.className}
            >
              <Box
                component="img"
                src="/images/bnb-logo.png"
                sx={{
                  width: "12px",
                  objectFit: "contain",
                  mr: "8px",
                  mb: "-1px",
                }}
              />
              <Typography
                className={inter.className}
                sx={{
                  color: "#666666",
                  fontWeight: 500,
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                Binance Smart Chain Testnet
              </Typography>
            </MenuItem>
            <MenuItem
              value="polygon"
              sx={{
                color: "#666666",
                fontWeight: "400",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
              }}
              className={inter.className}
            >
              <Box
                component="img"
                src="/images/polygon-logo.png"
                sx={{
                  width: "12px",
                  objectFit: "contain",
                  mr: "8px",
                  mb: "-1px",
                }}
              />
              <Typography
                className={inter.className}
                sx={{
                  color: "#666666",
                  fontWeight: 500,
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                Polygon
              </Typography>
            </MenuItem>
            <MenuItem
              value="ethereum"
              sx={{
                color: "#666666",
                fontWeight: "400",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
              }}
              className={inter.className}
            >
              <Box
                component="img"
                src="/images/ethereum-logo.png"
                sx={{
                  width: "8px",
                  objectFit: "contain",
                  mr: "8px",
                  mb: "-1px",
                }}
              />
              <Typography
                className={inter.className}
                sx={{
                  color: "#666666",
                  fontWeight: 500,
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                Ethereum
              </Typography>
            </MenuItem>
            <MenuItem
              value="sepolia"
              sx={{
                color: "#666666",
                fontWeight: "400",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
              }}
              className={inter.className}
            >
              <Box
                component="img"
                src="/images/ethereum-logo.png"
                sx={{
                  width: "8px",
                  objectFit: "contain",
                  mr: "8px",
                  mb: "-1px",
                }}
              />
              <Typography
                className={inter.className}
                sx={{
                  color: "#666666",
                  fontWeight: 500,
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                Sepolia
              </Typography>
            </MenuItem>
          </Select>
        </Box>

        <Button
          type="submit"
          sx={{
            mt: "30px",
            background: "linear-gradient(90deg, #e809d9 2.08%, #730b6c 100%)",
            width: "220px",
            height: "40px",
            textTransform: "initial",
            borderRadius: "20px",
            color: "#fff",
          }}
        >
          Create Your Smart Contract
        </Button>
      </Box>
    </Box>
  );
};

export default FirstOnBoarding;
