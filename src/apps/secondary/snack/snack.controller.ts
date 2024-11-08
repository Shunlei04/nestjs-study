import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnackService } from './snack.service';
import { CreateSnackDto } from './dto/create-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';

@Controller('snack')
export class SnackController {
  constructor(private readonly snackService: SnackService) {}

  @Post()
  create(@Body() createSnackDto: CreateSnackDto) {
    return this.snackService.create(createSnackDto);
  }

  @Get()
  findAll() {
    return this.snackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnackDto: UpdateSnackDto) {
    return this.snackService.update(+id, updateSnackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snackService.remove(+id);
  }
}
