/**
 * 관리자 계정 생성용 DTO
 * 기존 .NET Core AccountModel을 입력용으로 분리
 */

import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ description: '관리자 ID', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'ID는 최소 3자 이상이어야 합니다.' })
  @MaxLength(50, { message: 'ID는 최대 50자까지 가능합니다.' })
  id: string;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' })
  pw: string;
} 