import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseEnum } from 'src/resources/enum/database.enum';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';
import { Bed } from './entities/bed.entity';

@Injectable()
export class BedsService {
  constructor(
    @InjectRepository(Bed, DatabaseEnum.POSTGRESQL)
    private bedRepository: Repository<Bed>,
  ) {}

  count(options?: FindManyOptions<Bed>) {
    return this.bedRepository.count(options);
  }
  create(createBedDto: CreateBedDto) {
    try {
      const bed = this.bedRepository.create(createBedDto);
      return this.bedRepository.save(bed);
    } catch (error) {
      console.log(error);
    }
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
