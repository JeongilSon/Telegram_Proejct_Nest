/**
 * 봇 메시지용 DTO
 * 기존 .NET Core BotMessageDto에 해당
 */

import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BotMessageDto {
  @ApiProperty({ description: '채팅 ID', example: '123456789' })
  @IsString()
  @IsNotEmpty({ message: '채팅 ID는 필수입니다.' })
  chatId: string;

  @ApiProperty({ description: '메시지 내용', example: '봇에서 전송된 메시지입니다.' })
  @IsString()
  @IsNotEmpty({ message: '메시지 내용은 필수입니다.' })
  text: string;

  @ApiProperty({ description: '사용자 이름', example: '홍길동', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: '타임스탬프', example: '2024-01-01T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  timestamp?: string;
} 