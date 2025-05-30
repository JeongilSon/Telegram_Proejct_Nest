import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LinkService } from './link.service';

@ApiTags('link')
@Controller('api/link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  async findAll() {
    return this.linkService.findAll();
  }

  @Post('input')
  async create(@Body() createLinkDto: any) {
    return this.linkService.create(createLinkDto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.linkService.remove(name);
  }
} 