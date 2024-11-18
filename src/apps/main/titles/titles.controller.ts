import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TitlesService } from './titles.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Request } from 'express';
import {
  ArePulic,
  CurrentUser,
  IsPulic,
} from 'src/guards/policy/decorator/policy.decorator';
import { User } from '../users/entities/user.entity';

@ArePulic()
@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  @Post()
  create(@Body() createTitleDto: CreateTitleDto) {
    return this.titlesService.create(createTitleDto);
  }

  @Get()
  @IsPulic()
  findAll(@Req() req: Request, @CurrentUser('username') user: User) {
    console.log(req.user);

    console.log('======From decorator=======');

    console.log(user);
    return this.titlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titlesService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titlesService.update({ where: { id: +id } }, updateTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titlesService.remove({ where: { id: +id } });
  }
}
