/**
 * 메시지 전송용 DTO
 * 기존 .NET Core LivechatModel의 일부 필드를 입력용으로 분리
 */

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ description: '채팅 ID', example: '123456789' })
  @IsString()
  @IsNotEmpty({ message: '채팅 ID는 필수입니다.' })
  chatId: string;

  @ApiProperty({ description: '메시지 내용', example: '안녕하세요!' })
  @IsString()
  @IsNotEmpty({ message: '메시지 내용은 필수입니다.' })
  content: string;
} 