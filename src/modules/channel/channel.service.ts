import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from '../../entities/channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {}

  async findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  async create(createChannelDto: any): Promise<any> {
    const channel = this.channelRepository.create(createChannelDto);
    await this.channelRepository.save(channel);
    return { message: '채널이 성공적으로 저장되었습니다!' };
  }

  async remove(code: string): Promise<any> {
    const channel = await this.channelRepository.findOne({ where: { channel_Code: code } });
    if (!channel) {
      throw new NotFoundException('채널을 찾을 수 없습니다.');
    }
    await this.channelRepository.remove(channel);
    return { message: '채널이 성공적으로 삭제되었습니다!' };
  }
} 