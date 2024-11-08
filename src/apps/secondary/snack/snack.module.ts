import { Module } from '@nestjs/common';
import { SnackService } from './snack.service';
import { SnackController } from './snack.controller';

@Module({
  controllers: [SnackController],
  providers: [SnackService],
})
export class SnackModule {}
