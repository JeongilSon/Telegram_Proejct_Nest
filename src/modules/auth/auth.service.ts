/**
 * 기존 .NET Core 프로젝트에서 분리된 인증 및 계정 관리 로직
 * 원본: Telegram_Project2_Web/Controllers/AccountController.cs
 * 
 * 추가된 기능:
 * - JWT 토큰 생성
 * - bcrypt 비밀번호 해싱
 * - 보안 강화된 인증 로직
 */

import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find({
      order: { id: 'DESC' },
    });
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { id, pw } = createAccountDto;

    // 중복 계정 확인
    const existingAccount = await this.accountRepository.findOne({ where: { id } });
    if (existingAccount) {
      throw new ConflictException('이미 존재하는 계정 ID입니다.');
    }

    // 비밀번호 해싱
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pw, saltRounds);

    const account = this.accountRepository.create({
      id,
      pw: hashedPassword,
    });

    return this.accountRepository.save(account);
  }

  async remove(id: string): Promise<{ success: boolean; message: string }> {
    const account = await this.accountRepository.findOne({ where: { id } });
    
    if (!account) {
      throw new NotFoundException(`이름이 '${id}'인 아이디를 찾을 수 없습니다.`);
    }

    await this.accountRepository.remove(account);
    
    return { success: true, message: '계정이 성공적으로 삭제되었습니다.' };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; success: boolean; message: string }> {
    const { id, pw } = loginDto;

    const account = await this.accountRepository.findOne({ where: { id } });
    
    if (!account) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(pw, account.pw);
    if (!isPasswordValid) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    // JWT 토큰 생성
    const payload = { sub: account.id, username: account.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      success: true,
      message: '로그인 성공',
    };
  }

  async validateUser(userId: string): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { id: userId } });
  }
} 