import { Injectable } from '@nestjs/common';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bed } from './entities/bed.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class BedsService {
  constructor(@InjectRepository(Bed) private bedRepository: Repository<Bed>) {}

  count(options?: FindManyOptions<Bed>) {
    return this.bedRepository.count(options);
  }
  create(createBedDto: CreateBedDto) {
    const bed = this.bedRepository.create(createBedDto);
    return this.bedRepository.save(bed);
  }

  findAll(options?: FindManyOptions<Bed>) {
    return this.bedRepository.find(options);
  }

  findOne(options?: FindOneOptions<Bed>) {
    return this.bedRepository.findOne(options);
  }

  async update(options: FindOneOptions<Bed>, updateBedDto: UpdateBedDto) {
    const item = await this.findOne(options);
    return this.bedRepository.save({ ...item, ...updateBedDto });
  }

  async remove(options: FindOneOptions<Bed>) {
    const item = await this.findOne(options);
    const id = item.id;

    await this.bedRepository.delete(id);

    item.id = id;
    return item;
  }
}
