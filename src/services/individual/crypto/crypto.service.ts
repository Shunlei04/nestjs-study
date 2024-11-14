import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class CryptoJsService {
  constructor() {}

  randomHexString(bytes: any) {
    return randomBytes(bytes).toString('hex');
  }
}
