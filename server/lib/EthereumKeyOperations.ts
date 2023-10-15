import * as ethUtil from 'ethereumjs-util';

export class EthereumKeyOperations {
  static getPublicAddress(privateKey: string): string {
    const privateKeyBuffer = Buffer.from(privateKey.slice(2), 'hex');
    const publicKey = ethUtil.privateToPublic(privateKeyBuffer);
    const address = ethUtil.publicToAddress(publicKey).toString('hex');
    return `0x${address}`;
  }

  static signMessage(message: string, privateKey: string): string {
    const messageHash = ethUtil.hashPersonalMessage(Buffer.from(message));
    const signature = ethUtil.ecsign(
      messageHash,
      Buffer.from(privateKey.slice(2), 'hex')
    );
    return ethUtil.toRpcSig(signature.v, signature.r, signature.s);
  }
}
