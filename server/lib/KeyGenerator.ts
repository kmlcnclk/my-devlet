import * as CryptoJS from 'crypto-js';

export interface IKeyGenerator {
  generateKey(): string;
}

export class PrivateKeyGenerator implements IKeyGenerator {
  generateKey(): string {
    const privateKeyBytes = CryptoJS.lib.WordArray.random(32);
    const privateKeyHex = privateKeyBytes.toString(CryptoJS.enc.Hex);
    return `0x${privateKeyHex}`;
  }
}
