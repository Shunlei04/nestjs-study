import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  count(options?: FindManyOptions<Department>) {
    return this.departmentRepository.count(options);
  }
  create(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  findAll(options?: FindManyOptions<Department>) {
    return this.departmentRepository.find(options);
  }

  findOne(options?: FindOneOptions<Department>) {
    return this.departmentRepository.findOne(options);
  }

  async update(
    options: FindOneOptions<Department>,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const item = await this.findOne(options);
    return this.departmentRepository.save({ ...item, ...updateDepartmentDto });
  }

  async remove(options: FindOneOptions<Department>) {
    const item = await this.findOne(options);
    const id = item.id;

    await this.departmentRepository.delete(id);

    item.id = id;
    return item;
  }
}
