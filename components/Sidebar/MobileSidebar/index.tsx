import React, { useEffect, useState } from "react";
import clsx from "clsx";
import MainSidebar from "./MainSidebar";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SidebarWrapper from "./SidebarWrapper";
import VerticalNav from "../VerticalNav";
import AppScrollbar from "../AppScrollbar";
import { useRouter } from "next/router";
import { routesForMenu } from "@/constants/routes";
import { Button, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import SendTokenModal from "@/lib/sendTokenModal";
import { useDispatch, useSelector } from "react-redux";
import {
  GeneralValueType,
  setCurrentNetwork,
  setWalletAddress,
} from "@/store/slices/generalSlice";
import { AppDispatch, RootState } from "@/store";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { detectMetamask } from "@/lib/general";

const inter = Inter({ subsets: ["latin"] });

interface MobileSidebarProps {
  isCollapsedMobile: boolean;
  setCollapsedMobile: (isCollapsedMobile: boolean) => void;
  isCollapsed?: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}

function MobileSidebar({
  isCollapsedMobile,
  setCollapsedMobile,
  isCollapsed,
  setCollapsed,
}: MobileSidebarProps) {
  const router = useRouter();
  const [openTokenModal, setOpenTokenModal] = useState(false);

  const generalValues: GeneralValueType = useSelector(
    (state: RootState) => state.general.value
  ) as GeneralValueType;

  const { open, close } = useWeb3Modal();
  const { address, chainId } = useWeb3ModalAccount();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (chainId === 1) {
      dispatch(setCurrentNetwork("eth"));
    } else if (chainId === 11155111) {
      dispatch(setCurrentNetwork("sepolia"));
    } else if (chainId === 5) {
      dispatch(setCurrentNetwork("goerli"));
    } else if (chainId === 56) {
      dispatch(setCurrentNetwork("bsc"));
    } else if (chainId === 97) {
      dispatch(setCurrentNetwork("tbsc"));
    }
  }, [chainId]);

  useEffect(() => {
    dispatch(setWalletAddress(address ?? ""));
    detectMetamask(
      address?.toString() ?? generalValues.walletAddress,
      dispatch
    );
  }, [address, generalValues.walletAddress]);

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            lg: routesForMenu.includes(router.asPath) ? "block" : "none",
          },
        }}
      >
        <Drawer
          anchor="left"
          open={isCollapsedMobile}
          onClose={() => setCollapsedMobile(!isCollapsedMobile)}
          classes={{
            root: clsx(""),
            paper: clsx(""),
          }}
          style={{ position: "absolute" }}
        >
          <SidebarWrapper className="mini-sidebar">
            <MainSidebar>
              <AppScrollbar
                sx={{
                  py: 2,
                  height: "calc(100vh - 70px) !important",
                }}
              >
                <VerticalNav />
              </AppScrollbar>
            </MainSidebar>
          </SidebarWrapper>
          <Button
            type="button"
            onClick={() => {
              setOpenTokenModal(false);
              open();
            }}
            id="buy-token"
            sx={{
              position: "fixed",
              bottom: 10,
              left: generalValues.walletAddress ? 6 : 10,
              zIndex: 1300,
              width: generalValues.walletAddress ? "130px" : "260px",
              height: "50px",
              textTransform: "initial",
              borderRadius: "20px",
              background:
                "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
              color: "black",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
              }}
            >
              {generalValues.walletAddress ? " Your Wallet" : "Connect Wallet"}
            </Typography>
          </Button>
          {generalValues.walletAddress ? (
            <Button
              type="button"
              onClick={() => {
                close();
                setOpenTokenModal(true);
              }}
              id="buy-token"
              sx={{
                position: "fixed",
                bottom: 10,
                left: 144,
                zIndex: 1300,
                background:
                  "linear-gradient(90deg, #2563eb 2.08%, #1e40af 100%)",
                width: "130px",
                height: "50px",
                textTransform: "initial",
                borderRadius: "20px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <Typography
                className={inter.className}
                sx={{
                  color: "#f3f3f3",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Buy Token
              </Typography>
            </Button>
          ) : null}
        </Drawer>
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            lg: routesForMenu.includes(router.asPath) ? "none" : "block",
          },
        }}
      >
        <SidebarWrapper className="mini-sidebar">
          <MainSidebar>
            <AppScrollbar
              sx={{
                py: 2,
                height: "calc(100vh - 70px) !important",
              }}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </SidebarWrapper>
        <Button
          type="button"
          onClick={() => {
            setOpenTokenModal(false);
            open();
          }}
          id="buy-token"
          sx={{
            position: "fixed",
            bottom: 10,
            left: generalValues.walletAddress ? 6 : 10,
            zIndex: 1300,
            width: generalValues.walletAddress ? "130px" : "260px",
            height: "50px",
            textTransform: "initial",
            borderRadius: "20px",
            background:
              "linear-gradient(90deg, rgb(203,238,85) 0%, rgb(222,228,83) 100%)",
            color: "black",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
          >
            {generalValues.walletAddress ? " Your Wallet" : "Connect Wallet"}
          </Typography>
        </Button>
        {generalValues.walletAddress ? (
          <Button
            type="button"
            onClick={() => {
              close();
              setOpenTokenModal(true);
            }}
            id="buy-token"
            sx={{
              position: "fixed",
              bottom: 10,
              left: 144,
              zIndex: 1300,
              background: "linear-gradient(90deg, #2563eb 2.08%, #1e40af 100%)",
              width: "130px",
              height: "50px",
              textTransform: "initial",
              borderRadius: "20px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Typography
              className={inter.className}
              sx={{
                color: "#f3f3f3",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              Buy Token
            </Typography>
          </Button>
        ) : null}
      </Box>
      <SendTokenModal
        {...{ openTokenModal, setOpenTokenModal }}
        whichState="user"
      />
    </>
  );
}
export default MobileSidebar;
