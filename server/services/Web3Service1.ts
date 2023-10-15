import Default from "@/server/web3/Default";
import Ethereum from "@/server/web3/Ethereum";
import Polygon from "@/server/web3/Polygon";
import BSC from "@/server/web3/BSC";

class Web3Service {
  constructor() {}

  async whichNetwork(networkName: string) {
    switch (networkName.toLowerCase()) {
      case "bsc":
        return BSC;
      case "ethereum":
        return Ethereum;
      case "polygon":
        return Polygon;
      default:
        return Default;
    }
  }
}

export default new Web3Service();
