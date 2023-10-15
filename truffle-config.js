const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const {
  NEXT_PUBLIC_MNEMONIC,
  INFURA_BSC_TESTNET_PROVIDER,
  INFURA_BSC_PROVIDER,
  INFURA_POLYGON_PROVIDER,
  INFURA_POLYGON_TESTNET_PROVIDER,
  INFURA_ETHEREUM_PROVIDER,
  INFURA_ETHEREUM_TESTNET_PROVIDER,
} = process.env;

module.exports = {
  networks: {
    bsc_testnet: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: NEXT_PUBLIC_MNEMONIC,
          },
          providerOrUrl: INFURA_BSC_TESTNET_PROVIDER,
        }),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bsc: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: NEXT_PUBLIC_MNEMONIC,
          },
          providerOrUrl: INFURA_BSC_PROVIDER,
        }),
      network_id: 56,
      gasPrice: 20000000000,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    polygon_testnet: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: NEXT_PUBLIC_MNEMONIC,
          },
          providerOrUrl: INFURA_POLYGON_TESTNET_PROVIDER,
        }),
      network_id: 80001,
      gasPrice: 1000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    polygon: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: NEXT_PUBLIC_MNEMONIC,
          },
          providerOrUrl: INFURA_POLYGON_PROVIDER,
        }),
      network_id: 137,
      gasPrice: 1000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    ethereum_testnet: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: NEXT_PUBLIC_MNEMONIC,
          },
          providerOrUrl: INFURA_ETHEREUM_TESTNET_PROVIDER,
        }),
      network_id: 11155111,
      gasPrice: 1000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    ethereum: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: NEXT_PUBLIC_MNEMONIC,
          },
          providerOrUrl: INFURA_ETHEREUM_PROVIDER,
        }),
      network_id: 1,
      gasPrice: 1000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: '0.8.19',
    },
  },
};
