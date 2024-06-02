import { Box, Button, Typography, Link } from "@mui/material";
import React from "react";
import { Inter } from "next/font/google";
import TextLine from "./TextLine";
const inter = Inter({ subsets: ["latin"] });
import BadgeIcon from "@mui/icons-material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import InventoryIcon from "@mui/icons-material/Inventory";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import EventIcon from "@mui/icons-material/Event";
import { SmartContractReturnType } from "@/types/SmartContract";
import { format } from "date-fns";
import { useRouter } from "next/router";

interface Props {
  smartContract: SmartContractReturnType;
}

const SingleSmartContract: React.FC<Props> = ({ smartContract }: Props) => {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#edebeb",
            py: { xs: "30px", sm: "50px" },
            px: { xs: "20px", sm: "70px", md: "30px" },
            borderRadius: "20px",
            width: "100%",
            height: { xs: "auto", md: "500px" },
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              width: "100%",
              height: "90%",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "47%" },
                height: "100%",
              }}
            >
              <Typography
                className={inter.className}
                sx={{
                  color: "#333",
                  textAlign: "center",
                  fontWeight: 900,
                  mb: "30px",
                  ml: "10px",
                  fontSize: { xs: "15px", sm: "21px" },
                }}
              >
                My Smart Contract
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "98%",
                  mb: { xs: "40px", md: "0px" },
                  backgroundColor: "#f3f3f3",
                  p: "20px",
                  borderRadius: "13px",
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    mt: { xs: "20px", md: "10px" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <TextLine
                      label="Contract Name"
                      value={smartContract.name}
                      icon={
                        <BadgeIcon
                          sx={{
                            color: "#666",
                            width: "19px",
                            mr: "5px",
                          }}
                        />
                      }
                    />
                    <TextLine
                      label="Contract Network"
                      value={smartContract.network}
                      icon={
                        <LanguageIcon
                          sx={{
                            color: "#666",
                            width: "19px",
                            mr: "5px",
                          }}
                        />
                      }
                    />
                    <TextLine
                      label="Contract Supply"
                      value="Calculating..."
                      icon={
                        <InventoryIcon
                          sx={{
                            color: "#666",
                            width: "19px",
                            mr: "5px",
                          }}
                        />
                      }
                    />
                    <TextLine
                      label="Contract Holder"
                      value={smartContract.userId?.name}
                      icon={
                        <DataThresholdingIcon
                          sx={{
                            color: "#666",
                            width: "19px",
                            mr: "5px",
                          }}
                        />
                      }
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: "5px",
                      }}
                    >
                      <EventIcon
                        sx={{
                          color: "#666",
                          width: "19px",
                          mr: "5px",
                        }}
                      />
                      <Typography
                        className={inter.className}
                        sx={{
                          color: "#666",
                          fontWeight: 700,
                          fontSize: { xs: "13px", sm: "16px" },
                          minWidth: "fit-content",
                        }}
                      >
                        Last Running Date:
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
                        {format(
                          new Date(smartContract.updatedAt),
                          "dd-MM-yyyy"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "30px",
                    }}
                  >
                    <Button
                      type="button"
                      sx={{
                        background:
                          "linear-gradient(90deg, #e809d9 2.08%, #730b6c 100%)",
                        width: { xs: "100px", sm: "170px" },
                        height: "40px",
                        mr: "20px",
                        textTransform: "initial",
                        borderRadius: "17px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#fff",
                      }}
                    >
                      Manage
                    </Button>
                    <Link
                      href={
                        smartContract.network == "Binance Smart Chain"
                          ? `https://bscscan.com/address/${smartContract.contractAddressOfUser[0]}`
                          : smartContract.network ===
                            "Binance Smart Chain Testnet"
                          ? `https://testnet.bscscan.com/address/${smartContract.contractAddressOfUser[0]}`
                          : smartContract.network === "ethereum"
                          ? `https://etherscan.io/address/${smartContract.contractAddressOfUser[0]}`
                          : smartContract.network === "sepolia"
                          ? `https://sepolia.etherscan.io/address/${smartContract.contractAddressOfUser[0]}`
                          : smartContract.network === "polygon"
                          ? `https://mumbai.polygonscan.com/address/${smartContract.contractAddressOfUser[0]}`
                          : ""
                      }
                      target="_blank"
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "none",
                        },
                      }}
                    >
                      <Button
                        type="button"
                        sx={{
                          background:
                            "linear-gradient(90deg, #1d4ed8 2.08%, #2563eb 100%)",
                          width: { xs: "100px", sm: "220px" },
                          height: "40px",
                          textTransform: "initial",
                          borderRadius: "20px",
                          color: "#fff",
                        }}
                      >
                        <Typography
                          className={inter.className}
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            color: "white",
                          }}
                        >
                          Monitor On The Network
                        </Typography>
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          type="button"
          onClick={() => {
            router.push("/dashboard/smart-contract");
          }}
          sx={{
            mt: "20px",
            background: "linear-gradient(90deg, #e809d9 2.08%, #730b6c 100%)",
            width: "200px",
            height: "45px",
            textTransform: "initial",
            borderRadius: "20px",
            color: "#fff",
            mr: "20px",
            "&:hover": {
              scale: "101%",
            },
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
          }}
        >
          <Typography
            className={inter.className}
            sx={{ color: "#f3f3f3", fontWeight: "500", fontSize: "12px" }}
          >
            Create Smart Contract
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default SingleSmartContract;
