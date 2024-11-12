import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WardsService } from './wards.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { CreateWardPayloadPipe } from './pipes/create-ward-payload.pipe';
import { WardsGateway } from './wards.gateway';
import { WardsAdminGateway } from './wards-admin.gateway';

@Controller('wards')
export class WardsController {
  constructor(
    private readonly wardsService: WardsService,
    private wardsGateway: WardsGateway,
    private wardsAdminGateway: WardsAdminGateway,
  ) {
    // ward request from client
    this.wardsGateway.wardRequestSub.subscribe(({ client, wardName }) => {
      if (client) {
        this.wardsAdminGateway.sendWardRequestToAdminPortal(
          client.id,
          wardName,
        );
      }
    });

    // ward name accepted from admin
    this.wardsAdminGateway.wardNameAcceptedSub.subscribe(
      ({ adminClient, clientId, wardName }) => {
        if (adminClient) {
          this.wardsGateway.notifyClientWardNameAccepted(clientId, wardName);
        }
      },
    );
  }

  @Post()
  create(@Body(CreateWardPayloadPipe) createWardDto: CreateWardDto) {
    return this.wardsService.create(createWardDto);
  }

  @Get()
  findAll() {
    return this.wardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wardsService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWardDto: UpdateWardDto) {
    return this.wardsService.update({ where: { id: +id } }, updateWardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wardsService.remove({ where: { id: +id } });
  }
}
