import { getAccessTokenFromLocalStorage } from "@/localstorage/accessTokenStorage";
import { AppDispatch, RootState } from "@/store";
import {
  SmartContractState,
  getSmartContracts,
} from "@/store/slices/mySmartContractsSlice";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface FetchSmartContractProps {
  children: ReactNode;
}

const FetchSmartContracts: React.FC<FetchSmartContractProps> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const smartContracts: SmartContractState = useSelector(
    (state: RootState) => state.smartContracts
  ) as SmartContractState;

  useEffect(() => {
    if (typeof window !== "undefined")
      if (!smartContracts.values[0])
        dispatch(getSmartContracts(getAccessTokenFromLocalStorage() as string));
  }, [dispatch]);

  useEffect(() => {
    if (smartContracts.error) toast.error(smartContracts.error);
  }, [smartContracts.error]);

  return <>{children}</>;
};

export default FetchSmartContracts;
