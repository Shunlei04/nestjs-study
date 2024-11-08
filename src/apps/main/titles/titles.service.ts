import { Injectable } from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Title } from './entities/title.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class TitlesService {
  constructor(
    @InjectRepository(Title) private titleRepository: Repository<Title>,
  ) {}

  count(options?: FindManyOptions<Title>) {
    return this.titleRepository.count(options);
  }
  create(createTitleDto: CreateTitleDto) {
    const title = this.titleRepository.create(createTitleDto);
    this.titleRepository.save(title);
  }

  findAll(options?: FindManyOptions<Title>) {
    return this.titleRepository.find(options);
  }

  findOne(options?: FindOneOptions<Title>) {
    return this.titleRepository.findOne(options);
  }

  async update(options: FindOneOptions<Title>, updateTitleDto: UpdateTitleDto) {
    const item = await this.titleRepository.findOne(options);
    return this.titleRepository.save({ ...item, ...updateTitleDto });
  }

  async remove(options: FindOneOptions<Title>) {
    const item = await this.titleRepository.findOne(options);
    const id = item.id;

    await this.titleRepository.remove(item);

    item.id = id;
    return item;
  }
}
