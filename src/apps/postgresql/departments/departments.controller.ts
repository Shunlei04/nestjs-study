import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsGateway } from './departments.gateway';
import { DepartmentsAdminGateway } from './departments-admin.gateway';

@Controller('departments')
export class DepartmentsController {
  constructor(
    private departmentsService: DepartmentsService,
    private departmentsGateway: DepartmentsGateway,
    private departmentsAdminGateway: DepartmentsAdminGateway,
  ) {
    // department request from client
    this.departmentsGateway.departmentRequestSub.subscribe(
      ({ client, departmentName }) => {
        if (client) {
          this.departmentsAdminGateway.sendDepartmentRequestToAdminPortal(
            client.id,
            departmentName,
          );
        }
      },
    );

    // department name accepted from admin
    this.departmentsAdminGateway.departmentAcceptedSub.subscribe(
      ({ adminClient, clientId, departmentName }) => {
        if (adminClient) {
          this.departmentsGateway.notifyClientDepartmentNameAccepted(
            clientId,
            departmentName,
          );
        }
      },
    );
  }

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(
      { where: { id: +id } },
      updateDepartmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove({ where: { id: +id } });
  }
}
