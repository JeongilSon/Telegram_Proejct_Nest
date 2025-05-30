import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatBotTokenDto {
  @ApiProperty({ description: 'ChatBot 토큰' })
  @IsString()
  @IsNotEmpty()
  chatBotToken: string;
} 