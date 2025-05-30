/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Controllers/AccountController.cs
 * 
 * 변경사항:
 * - [Route("api/[controller]")] → @Controller('api/account')
 * - [HttpGet] → @Get()
 * - [HttpPost("Input")] → @Post('input')
 * - [HttpPost("login")] → @Post('login') + JWT 토큰 반환
 * - [HttpDelete("{id}")] → @Delete(':id')
 */

import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginDto } from './dto/login.dto';
import { Account } from '../../entities/account.entity';

@ApiTags('auth')
@Controller('api/account')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: '모든 관리자 계정 조회' })
  @ApiResponse({ status: 200, description: '계정 목록 반환', type: [Account] })
  async findAll(): Promise<Account[]> {
    return this.authService.findAll();
  }

  @Post('input')
  @ApiOperation({ summary: '새 관리자 계정 생성' })
  @ApiResponse({ status: 201, description: '계정이 성공적으로 생성됨', type: Account })
  @ApiResponse({ status: 409, description: '이미 존재하는 계정 ID' })
  async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.authService.create(createAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '관리자 계정 삭제' })
  @ApiResponse({ status: 200, description: '계정이 성공적으로 삭제됨' })
  @ApiResponse({ status: 404, description: '계정을 찾을 수 없음' })
  async remove(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    return this.authService.remove(id);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '관리자 로그인' })
  @ApiResponse({ 
    status: 200, 
    description: '로그인 성공 및 JWT 토큰 반환',
    schema: {
      properties: {
        access_token: { type: 'string' },
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string; success: boolean; message: string }> {
    return this.authService.login(loginDto);
  }
} 