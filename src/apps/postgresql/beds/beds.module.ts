import { Module } from '@nestjs/common';
import { BedsService } from './beds.service';
import { BedsController } from './beds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bed } from './entities/bed.entity';
import { BedsGateway } from './beds.gateway';
import { BedsAdminGateway } from './beds-admin.gateway';

@Module({
  controllers: [BedsController],
  providers: [BedsService, BedsGateway, BedsAdminGateway],
  imports: [TypeOrmModule.forFeature([Bed])],
})
export class BedsModule {}
