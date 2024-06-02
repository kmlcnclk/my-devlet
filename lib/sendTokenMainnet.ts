import { get } from "lodash";
import { toast } from "react-toastify";
import { BrowserProvider, ethers } from "ethers";

export const sendToken = async (
  address: any,
  value: number,
  currentNetwork: string,
  wallet: string,
  walletProvider: any
) => {
  try {
    if (get(window, "ethereum") || walletProvider) {
      if (address && wallet) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        if (currentNetwork === "bsc" || currentNetwork === "tbsc") {
          const amount = ethers.parseUnits(value.toString(), 18);

          const tx = await signer.sendTransaction({
            from: address,
            to: wallet,
            value: amount,
            gasLimit: 32000,
            gasPrice: 3000000000,
            chainId: "0x38",
          });

          if (
            tx?.from?.toLowerCase() === address.toLowerCase() &&
            tx?.to?.toLowerCase() === wallet.toLowerCase()
          )
            return tx.hash;
          return false;
        } else if (
          currentNetwork === "eth" ||
          currentNetwork === "sepolia" ||
          currentNetwork === "goerli"
        ) {
          const amount = ethers.parseUnits(value.toString(), 18);

          const tx = await signer.sendTransaction({
            from: address,
            to: wallet,
            value: amount,
            gasLimit: 30000,
            gasPrice: 42000000000,
            chainId: "0x1",
          });

          if (
            tx?.from?.toLowerCase() === address.toLowerCase() &&
            tx?.to?.toLowerCase() === wallet.toLowerCase()
          )
            return tx.hash;
        }
        return false;
      } else {
        toast.info("You have to connect your wallet");
        return false;
      }
    }
  } catch (error: any) {
    if (error.message.includes("user reject")) {
      toast.info("You rejected it");
    } else if (
      error.message.includes(
        "Parameter decoding error: Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced."
      )
    ) {
      toast.error("There is a problem about contract ABIs");
    } else if (error.message.includes("User rejected the transaction")) {
      toast.info("You rejected it");
    } else {
      toast.error(
        "There is a problem about transaction. Please try again later!!"
      );
    }
    return false;
  }
};
