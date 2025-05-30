/**
 * 기존 .NET Core BotController 비즈니스 로직
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotToken } from '../../entities/bot-token.entity';
import { ChatBotTokenDto } from './dto/chatbot-token.dto';
import { MainBotTokenDto } from './dto/mainbot-token.dto';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(BotToken)
    private botTokenRepository: Repository<BotToken>,
  ) {}

  async getBotTokens(): Promise<BotToken> {
    const botToken = await this.botTokenRepository.findOne({ where: {} });
    
    if (!botToken) {
      return {
        id: 0,
        chat_bot_token: '',
        main_bot_token: '',
        created_at: new Date(),
        updated_at: new Date(),
      } as BotToken;
    }
    
    return botToken;
  }

  async saveChatBotToken(chatBotTokenDto: ChatBotTokenDto): Promise<{ success: boolean; message: string }> {
    let botToken = await this.botTokenRepository.findOne({ where: {} });

    if (!botToken) {
      botToken = this.botTokenRepository.create({
        chat_bot_token: chatBotTokenDto.chatBotToken,
      });
    } else {
      botToken.chat_bot_token = chatBotTokenDto.chatBotToken;
    }

    await this.botTokenRepository.save(botToken);
    return { success: true, message: 'ChatBot 토큰이 저장되었습니다.' };
  }

  async saveMainBotToken(mainBotTokenDto: MainBotTokenDto): Promise<{ success: boolean; message: string }> {
    let botToken = await this.botTokenRepository.findOne({ where: {} });

    if (!botToken) {
      botToken = this.botTokenRepository.create({
        main_bot_token: mainBotTokenDto.mainBotToken,
      });
    } else {
      botToken.main_bot_token = mainBotTokenDto.mainBotToken;
    }

    await this.botTokenRepository.save(botToken);
    return { success: true, message: 'MainBot 토큰이 저장되었습니다.' };
  }
} 