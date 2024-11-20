import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseEnum } from 'src/resources/enum/database.enum';
import { BedsAdminGateway } from './beds-admin.gateway';
import { BedsController } from './beds.controller';
import { BedsGateway } from './beds.gateway';
import { BedsService } from './beds.service';
import { Bed } from './entities/bed.entity';
import { BedsInternalPolicy } from './policy/beds-internal-policy';

@Module({
  controllers: [BedsController],
  providers: [BedsService, BedsGateway, BedsAdminGateway, BedsInternalPolicy],
  imports: [TypeOrmModule.forFeature([Bed], DatabaseEnum.POSTGRESQL)],
})
export class BedsModule {}
