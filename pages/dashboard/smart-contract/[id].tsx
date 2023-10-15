import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";

import { Box, CircularProgress } from "@mui/material";

import RequireAuth from "@/components/RequireAuth";
import FetchUser from "@/components/FetchUser";
import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";
import { toast } from "react-toastify";
import { SmartContractReturnType } from "@/types/SmartContract";
import SingleSmartContract from "@/components/SmartContract/SingleSmartContract";

const AppPage: NextPage = () => {
  const router = useRouter();

  const [smartContract, setSmartContract] =
    useState<SmartContractReturnType | null>(null);

  useEffect(() => {
    const getSmartContractById = async () => {
      const res = await fetch(
        `/api/user/smart-contract/getByID?id=${router.query.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSmartContract(data.smartContract);
      } else {
        if (data?.message) toast.error(data.message);
        else if (data?.error) toast.error(data.error.message);
        else if (data[0]) toast.error(data[0].message);
      }
    };

    if (router.query.id) {
      getSmartContractById();
    }
  }, [router]);

  return (
    <>
      <RequireAuth>
        <FetchUser>
          <Sidebar pageTitle="">
            {router.query.id && smartContract?._id ? (
              <SingleSmartContract {...{ smartContract }} />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress
                  size={40}
                  sx={{
                    color: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
                  }}
                />
              </Box>
            )}
          </Sidebar>
        </FetchUser>
      </RequireAuth>
    </>
  );
};

export default AppPage;
