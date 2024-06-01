import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { AppDispatch, RootState } from "@/store";
import {
  GeneralValueType,
  setCurrentNetwork,
} from "@/store/slices/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
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

  const { chainId } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (chainId === 1) {
      dispatch(setCurrentNetwork("eth"));
      setInputs((prev: any) => {
        let updatedPrev = { ...prev };
        updatedPrev.network = "ethereum";
        return updatedPrev;
      });
    } else if (chainId === 11155111) {
      dispatch(setCurrentNetwork("sepolia"));
      setInputs((prev: any) => {
        let updatedPrev = { ...prev };
        updatedPrev.network = "sepolia";
        return updatedPrev;
      });
    } else if (chainId === 5) {
      dispatch(setCurrentNetwork("goerli"));
      setInputs((prev: any) => {
        let updatedPrev = { ...prev };
        updatedPrev.network = "goerli";
        return updatedPrev;
      });
    } else if (chainId === 56) {
      dispatch(setCurrentNetwork("bsc"));
      setInputs((prev: any) => {
        let updatedPrev = { ...prev };
        updatedPrev.network = "Binance Smart Chain";
        return updatedPrev;
      });
    } else if (chainId === 97) {
      dispatch(setCurrentNetwork("tbsc"));
      setInputs((prev: any) => {
        let updatedPrev = { ...prev };
        updatedPrev.network = "Binance Smart Chain Testnet";
        return updatedPrev;
      });
    }
  }, [chainId]);

  const generalValues: GeneralValueType = useSelector(
    (state: RootState) => state.general.value
  ) as GeneralValueType;

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

          <Button
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mt: "10px",
              height: "50px",
              borderRadius: "10px",
              py: "10px",
              border: "#f3f3f3 1px solid",
              background: "linear-gradient(90deg, #2563eb 2.08%, #1e40af 100%)",
              "&:hover": {
                border: "white 2px solid",
              },
            }}
            onClick={() => {
              if (generalValues.walletAddress) {
                open({ view: "Networks" });
              }
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
              }}
            >
              {generalValues.currentNetwork === "bsc" ||
              generalValues.currentNetwork === "tbsc"
                ? "Switch to ETH"
                : "Switch to BSC"}
            </Typography>
            {generalValues.currentNetwork === "eth" ||
            generalValues.currentNetwork === "sepolia" ||
            generalValues.currentNetwork === "goerli" ? (
              <Image
                style={{
                  marginLeft: "10px",
                  objectFit: "contain",
                }}
                src="/images/bnb-logo.png"
                alt="BNB Logo"
                width={25}
                height={25}
              />
            ) : (
              <Image
                style={{
                  marginLeft: "10px",
                  objectFit: "contain",
                }}
                src="/images/ethereum-logo.png"
                alt="ETH Logo"
                width={25}
                height={25}
              />
            )}
          </Button>
        </Box>

        <Button
          type="submit"
          sx={{
            mt: "30px",
            background: "linear-gradient(90deg, #e809d9 2.08%, #730b6c 100%)",
            width: "100%",
            height: "50px",
            borderRadius: "10px",
            py: "10px",
            textTransform: "initial",
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
