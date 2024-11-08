import { Module } from '@nestjs/common';
import { SecondaryDatabaseService as SecondaryDatabaseService } from './secondary-database.service';

@Module({
  providers: [SecondaryDatabaseService],
  exports: [SecondaryDatabaseService],
})
export class SecondaryDatabaseModule {}
