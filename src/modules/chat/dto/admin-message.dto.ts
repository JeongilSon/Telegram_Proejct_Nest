/**
 * 관리자 메시지용 DTO
 * 기존 .NET Core AdminMessageDto에 해당
 */

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminMessageDto {
  @ApiProperty({ description: '채팅 ID', example: '123456789' })
  @IsString()
  @IsNotEmpty({ message: '채팅 ID는 필수입니다.' })
  chatId: string;

  @ApiProperty({ description: '관리자 메시지 내용', example: '안녕하세요. 관리자입니다.' })
  @IsString()
  @IsNotEmpty({ message: '메시지 내용은 필수입니다.' })
  text: string;
} 