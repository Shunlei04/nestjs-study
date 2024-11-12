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
import { CreateBedNoPipe } from './pipes/create-bedNo.pipe';
import { BedsGateway } from './beds.gateway';
import { BedsAdminGateway } from './beds-admin.gateway';

@Controller('beds')
export class BedsController {
  constructor(
    private readonly bedsService: BedsService,
    private bedsGateway: BedsGateway,
    private bedsAdminGateway: BedsAdminGateway,
  ) {
    this.bedsGateway.bedRequestSub.asObservable().subscribe({
      next: ({ client, bedNo }) => {
        if (client) {
          this.bedsAdminGateway.sendBedRequestToAdminPortal(client.id, bedNo);
        }
      },
    });

    // admin accept bed no
    this.bedsAdminGateway.bedNoAcceptedSub.asObservable().subscribe({
      next: ({ adminClient, clientId, bedNo }) => {
        if (adminClient) {
          this.bedsGateway.notifyClientBedNoAccepted(clientId, bedNo);
        }
      },
    });
  }

  @Post()
  create(@Body(CreateBedNoPipe) createBedDto: CreateBedDto) {
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
