import { AppDispatch } from "@/store";
import { setCurrentBalance } from "@/store/slices/generalSlice";
import { get } from "lodash";
import Web3 from "web3";

export const detectMetamask = async (
  walletAddress: string,
  dispatch: AppDispatch
) => {
  if (get(window, "ethereum")) {
    if (walletAddress) {
      // @ts-ignore
      const web3 = new Web3(window.ethereum);
      const b = await web3.eth.getBalance(walletAddress);

      dispatch(
        setCurrentBalance(Number((Number(b) / Math.pow(10, 18)).toFixed(4)))
      );
    }
  }
};
