/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Controllers/BotController.cs
 */

import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BotService } from './bot.service';
import { ChatBotTokenDto } from './dto/chatbot-token.dto';
import { MainBotTokenDto } from './dto/mainbot-token.dto';

@ApiTags('bot')
@Controller('api/bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get('tokens')
  @ApiOperation({ summary: '현재 설정된 봇 토큰들 조회' })
  async getBotTokens() {
    return this.botService.getBotTokens();
  }

  @Post('chatbot')
  @ApiOperation({ summary: 'ChatBot 토큰 저장/업데이트' })
  async saveChatBotToken(@Body() chatBotTokenDto: ChatBotTokenDto) {
    return this.botService.saveChatBotToken(chatBotTokenDto);
  }

  @Post('mainbot')
  @ApiOperation({ summary: 'MainBot 토큰 저장/업데이트' })
  async saveMainBotToken(@Body() mainBotTokenDto: MainBotTokenDto) {
    return this.botService.saveMainBotToken(mainBotTokenDto);
  }
} 