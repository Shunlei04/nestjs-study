import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { WardsAdminGateway } from './wards-admin.gateway';
import { WardsController } from './wards.controller';
import { WardsGateway } from './wards.gateway';
import { WardsService } from './wards.service';

@Module({
  controllers: [WardsController],
  providers: [WardsService, WardsGateway, WardsAdminGateway],
  imports: [TypeOrmModule.forFeature([Ward])],
})
export class WardsModule {}
