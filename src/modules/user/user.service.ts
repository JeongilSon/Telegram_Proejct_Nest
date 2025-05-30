/**
 * 기존 .NET Core 프로젝트에서 분리된 비즈니스 로직
 * 원본: Telegram_Project2_Web/Controllers/UserController.cs의 메서드 내부 로직
 * 
 * 변경사항:
 * - .NET Core에서는 Controller에 직접 비즈니스 로직이 포함되어 있었음
 * - Nest.js에서는 서비스 계층으로 분리하여 관심사 분리 적용
 * - _context.Users → @InjectRepository(User) userRepository
 * - await _context.Users.ToListAsync() → this.userRepository.find()
 * - await _context.Users.FindAsync() → this.userRepository.findOne()
 * - _context.Users.Add() → this.userRepository.create()
 * - await _context.SaveChangesAsync() → this.userRepository.save()
 * - Exception 처리 → NotFoundException 등 Nest.js 예외 클래스 사용
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(chatId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { chat_ID: chatId },
    });

    if (!user) {
      throw new NotFoundException(`User with chat ID ${chatId} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(chatId: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ chat_ID: chatId }, updateUserDto);
    return this.findOne(chatId);
  }

  async remove(chatId: string): Promise<void> {
    const result = await this.userRepository.delete({ chat_ID: chatId });
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with chat ID ${chatId} not found`);
    }
  }

  async updateUserQuestion(chatId: string, question: string): Promise<User> {
    await this.userRepository.update(
      { chat_ID: chatId },
      { user_Question: question }
    );
    return this.findOne(chatId);
  }

  async findByChatId(chatId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { chat_ID: chatId },
    });
  }
} 