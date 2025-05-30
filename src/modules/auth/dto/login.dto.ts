/**
 * 로그인용 DTO
 * 기존 .NET Core LoginRequest 클래스에 해당
 */

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '관리자 ID', example: 'admin' })
  @IsString()
  @IsNotEmpty({ message: 'ID를 입력해주세요.' })
  id: string;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  pw: string;
} 