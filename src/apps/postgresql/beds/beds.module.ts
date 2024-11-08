import { Module } from '@nestjs/common';
import { BedsService } from './beds.service';
import { BedsController } from './beds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bed } from './entities/bed.entity';

@Module({
  controllers: [BedsController],
  providers: [BedsService],
  imports: [TypeOrmModule.forFeature([Bed])],
})
export class BedsModule {}
