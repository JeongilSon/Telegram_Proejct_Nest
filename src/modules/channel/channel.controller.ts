import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';

@ApiTags('channel')
@Controller('api/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async findAll() {
    return this.channelService.findAll();
  }

  @Post('input')
  async create(@Body() createChannelDto: any) {
    return this.channelService.create(createChannelDto);
  }

  @Delete(':code')
  async remove(@Param('code') code: string) {
    return this.channelService.remove(code);
  }
} 