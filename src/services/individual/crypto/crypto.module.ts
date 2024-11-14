import { Global, Module } from '@nestjs/common';
import { CryptoJsService } from './crypto.service';

@Global()
@Module({
  providers: [CryptoJsService],
  exports: [CryptoJsService],
})
export class CryptoJsModule {}
