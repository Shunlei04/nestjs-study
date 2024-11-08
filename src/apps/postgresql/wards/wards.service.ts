import { Injectable } from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Ward) private wardRepository: Repository<Ward>,
  ) {}

  count(options?: FindManyOptions<Ward>) {
    return this.wardRepository.count(options);
  }

  create(createWardDto: CreateWardDto) {
    const ward = this.wardRepository.create(createWardDto);
    return this.wardRepository.save(ward);
  }

  findAll(options?: FindManyOptions<Ward>) {
    return this.wardRepository.find(options);
  }

  findOne(options?: FindOneOptions<Ward>) {
    return this.wardRepository.findOne(options);
  }

  async update(options: FindOneOptions<Ward>, updateWardDto: UpdateWardDto) {
    const item = await this.findOne(options);
    return this.wardRepository.save({ ...item, ...updateWardDto });
  }

  async remove(options: FindOneOptions<Ward>) {
    const item = await this.findOne(options);
    const id = item.id;

    await this.wardRepository.delete(id);

    item.id = id;
    return item;
  }
}
