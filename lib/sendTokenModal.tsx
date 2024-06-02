import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  sendToken as sendTokenForAdmin,
  getAddress as getAddressForAdmin,
} from "@/lib/sendTokenForAdmin";
import { getAddress, sendToken } from "@/lib/sendToken";
import { sendToken as sendTokenMainnet } from "@/lib/sendTokenMainnet";

import { toast } from "react-toastify";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { GeneralValueType } from "@/store/slices/generalSlice";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Props {
  openTokenModal: boolean;
  setOpenTokenModal: Function;
  whichState: string;
}

const SendTokenModal: React.FC<Props> = ({
  openTokenModal,
  setOpenTokenModal,
  whichState,
}: Props) => {
  const [amountOfToken, setAmountOfToken] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const generalValues: GeneralValueType = useSelector(
    (state: RootState) => state.general.value
  ) as GeneralValueType;

  const submitFunc = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (amountOfToken !== "0") {
        if (whichState === "admin") {
          const addressForAdmin = await getAddressForAdmin();
          // await sendTokenForAdmin(Number(amountOfToken));

          const result = await sendTokenMainnet(
            address,
            Number(amountOfToken),
            generalValues.currentNetwork,
            addressForAdmin,
            walletProvider
          );

          if (result) toast.success("Transfer successfully done!!");
        } else {
          const addressForUser = await getAddress();
          // await sendToken(Number(amountOfToken));

          const result = await sendTokenMainnet(
            address,
            Number(amountOfToken),
            generalValues.currentNetwork,
            addressForUser,
            walletProvider
          );

          if (result) toast.success("Transfer successfully done!!");
        }
        setIsLoading(false);
        setOpenTokenModal(false);
        setAmountOfToken("0");
      } else {
        toast.info("You cannot send 0 token");
        setIsLoading(false);
      }
    } catch (err: any) {
      setIsLoading(false);
      setOpenTokenModal(false);
      setAmountOfToken("0");
      console.log(err);
    }
  };

  return (
    <Modal open={openTokenModal}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          right: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: "400px" },
          height: { xs: "300px" },
          bgcolor: "#F3F6FA",
          boxShadow: 24,
          borderRadius: "10px",
          p: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          outline: "none",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <CloseIcon
            onClick={() => {
              setOpenTokenModal(false);
              setIsLoading(false);
              setAmountOfToken("0");
            }}
            sx={{
              width: "16px",
              height: "16px",
              cursor: "pointer",
              position: "absolute",
              right: "0px",
              top: "-15px",
            }}
          />
        </Box>
        <Box
          component="form"
          sx={{
            width: "100%",
          }}
          onSubmit={submitFunc}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Send Token
          </Typography>
          <Box
            sx={{
              mt: "39px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: "#666666",
                fontWeight: "500",
                fontSize: "15px",
                mb: "10px",
                pl: "3px",
              }}
            >
              Amount of Token:
            </Typography>

            <Box
              component="input"
              value={amountOfToken}
              type="number"
              onChange={(e) => setAmountOfToken(e.target.value)}
              step="0.01"
              required
              sx={{
                width: "100%",
                height: "47px",
                border: "#8F8F8F solid 0.2px",
                bgcolor: "#F8F9F8",
                borderRadius: "10px",
                color: "#666666",
                px: "13px",
                boxShadow: "0px 3px 20px 0px #0000001A",
                "&:focus": {
                  outline: "none",
                },
              }}
            />
          </Box>
          <Button
            type="submit"
            sx={{
              color: "#FFFDFF",
              fontWeight: "500",
              fontSize: "15px",
              height: { xs: "49px" },
              width: { xs: "100%" },
              mt: { xs: "30px" },
              display: "inline",
              borderRadius: "15px",
              bgcolor: "#317DED",
              border: "2px solid #317DED",
              boxShadow: "0px 4px 10px 0px #00000040",
              "&:hover": {
                scale: "1.02",
                transition: "transform 0.3s ease",
              },
            }}
            variant="contained"
          >
            {isLoading ? (
              <CircularProgress
                size={23}
                sx={{ color: "#f3f3f3", mt: "5px" }}
              />
            ) : (
              "Send"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SendTokenModal;
