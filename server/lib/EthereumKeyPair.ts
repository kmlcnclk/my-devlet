import { IKeyGenerator, PrivateKeyGenerator } from './KeyGenerator';
import { EthereumKeyOperations } from './EthereumKeyOperations';

export class EthereumKeyPair {
  public readonly privateKey: string;
  public readonly publicAddress: string;

  constructor(
    keyGenerator: IKeyGenerator = new PrivateKeyGenerator(),
    existingPrivateKey?: string
  ) {
    if (existingPrivateKey) {
      this.privateKey = existingPrivateKey;
    } else {
      this.privateKey = keyGenerator.generateKey();
    }
    this.publicAddress = EthereumKeyOperations.getPublicAddress(
      this.privateKey
    );
  }

  signMessage(message: string): string {
    return EthereumKeyOperations.signMessage(message, this.privateKey);
  }

  getPublicAddress(): string {
    return this.publicAddress;
  }

  getPrivateAddress(): string {
    return this.privateKey;
  }
}
