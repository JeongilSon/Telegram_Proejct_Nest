import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from '../../entities/link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async findAll(): Promise<Link[]> {
    return this.linkRepository.find();
  }

  async create(createLinkDto: any): Promise<any> {
    const link = this.linkRepository.create(createLinkDto);
    await this.linkRepository.save(link);
    return { message: '링크가 성공적으로 저장되었습니다!' };
  }

  async remove(name: string): Promise<any> {
    const link = await this.linkRepository.findOne({ where: { link_Name: name } });
    if (!link) {
      throw new NotFoundException('링크를 찾을 수 없습니다.');
    }
    await this.linkRepository.remove(link);
    return { message: '링크가 성공적으로 삭제되었습니다!' };
  }
} 