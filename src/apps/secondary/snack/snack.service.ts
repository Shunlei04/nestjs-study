import { Injectable } from '@nestjs/common';
import { CreateSnackDto } from './dto/create-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';

@Injectable()
export class SnackService {
  create(createSnackDto: CreateSnackDto) {
    return 'This action adds a new snack';
  }

  findAll() {
    return `This action returns all snack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} snack`;
  }

  update(id: number, updateSnackDto: UpdateSnackDto) {
    return `This action updates a #${id} snack`;
  }

  remove(id: number) {
    return `This action removes a #${id} snack`;
  }
}
