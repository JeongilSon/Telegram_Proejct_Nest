import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MainBotTokenDto {
  @ApiProperty({ description: 'MainBot 토큰' })
  @IsString()
  @IsNotEmpty()
  mainBotToken: string;
} 