import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { DepartmentsGateway } from './departments.gateway';
import { DepartmentsAdminGateway } from './departments-admin.gateway';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentsGateway, DepartmentsAdminGateway],
  imports: [TypeOrmModule.forFeature([Department])],
})
export class DepartmentsModule {}
