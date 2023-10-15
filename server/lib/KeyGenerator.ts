import * as crypto from 'crypto';

export interface IKeyGenerator {
  generateKey(): string;
}

export class PrivateKeyGenerator implements IKeyGenerator {
  generateKey(): string {
    const privateKeyBytes = crypto.randomBytes(32);
    return `0x${privateKeyBytes.toString('hex')}`;
  }
}
