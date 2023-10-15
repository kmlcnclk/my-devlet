import React, { useEffect, useState } from "react";
import { SmartContractReturnType } from "@/types/SmartContract";
import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const useFetchSmartContract = (page: string) => {
  const [smartContracts, setSmartContracts] = useState<
    SmartContractReturnType[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const getSingleSmartContract = async () => {
      const res = await fetch(
        "/api/user/web3/smart-contract/getAllWithUserID",
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
        setSmartContracts(data.smartContracts);
        if (!data.smartContracts[0] && page == "create-nfts") {
          toast.info("You must create smart contract for create NFTs");
          router.push("/dashboard/smart-contract");
        }
      } else {
        if (data?.message) toast.error(data.message);
        else if (data?.error) toast.error(data.error.message);
        else if (data[0]) toast.error(data[0].message);
      }
    };
    getSingleSmartContract();
  }, []);

  return { smartContracts, setSmartContracts };
};

export default useFetchSmartContract;
