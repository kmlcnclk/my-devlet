import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";

const projectId = process.env.NEXT_PUBLIC_WEB3_MODAL_PROJECT_ID;
const url = process.env.NEXT_PUBLIC_UI_URL;
const NEXT_PUBLIC_INFURA_BSC_TESTNET_PROVIDER =
  process.env.NEXT_PUBLIC_INFURA_BSC_TESTNET_PROVIDER;
const NEXT_PUBLIC_INFURA_BSC_PROVIDER =
  process.env.NEXT_PUBLIC_INFURA_BSC_PROVIDER;
const NEXT_PUBLIC_INFURA_ETHEREUM_PROVIDER =
  process.env.NEXT_PUBLIC_INFURA_ETHEREUM_PROVIDER;
const NEXT_PUBLIC_INFURA_ETHEREUM_TESTNET_PROVIDER =
  process.env.NEXT_PUBLIC_INFURA_ETHEREUM_TESTNET_PROVIDER;

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: NEXT_PUBLIC_INFURA_ETHEREUM_PROVIDER,
};

const sepolia = {
  chainId: 0xaa36a7,
  name: "Sepolia Testnet",
  currency: "SepoliaETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: NEXT_PUBLIC_INFURA_ETHEREUM_TESTNET_PROVIDER,
};

const goerli = {
  chainId: 5,
  name: "Goerli Testnet",
  currency: "GoerliETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://eth-goerli.public.blastapi.io",
};

const bsc = {
  chainId: 0x38,
  name: "BNB Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: NEXT_PUBLIC_INFURA_BSC_PROVIDER,
};

const bscTestnet = {
  chainId: 0x61,
  name: "BNB Chain Testnet",
  currency: "tBNB",
  explorerUrl: "https://testnet.bscscan.com",
  rpcUrl: NEXT_PUBLIC_INFURA_BSC_TESTNET_PROVIDER,
};

const metadata = {
  name: "Golden Cobra",
  description: "Golden Cobra",
  url: url,
  icons: ["https://www.gravatar.com/avatar/goldencobra?d=identicon"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet, sepolia, bsc, bscTestnet, goerli],
  projectId,
  enableAnalytics: true,
});

export function Web3ModalProvider({ children }: { children: any }) {
  return children;
}
