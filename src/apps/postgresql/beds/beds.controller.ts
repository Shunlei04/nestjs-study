import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BedsService } from './beds.service';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';

@Controller('beds')
export class BedsController {
  constructor(private readonly bedsService: BedsService) {}

  @Post()
  create(@Body() createBedDto: CreateBedDto) {
    return this.bedsService.create(createBedDto);
  }

  @Get()
  findAll() {
    return this.bedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bedsService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBedDto: UpdateBedDto) {
    return this.bedsService.update({ where: { id: +id } }, updateBedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bedsService.remove({ where: { id: +id } });
  }
}
