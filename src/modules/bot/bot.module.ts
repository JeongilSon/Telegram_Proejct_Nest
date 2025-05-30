/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Controllers/BotController.cs
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotToken } from '../../entities/bot-token.entity';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
  imports: [TypeOrmModule.forFeature([BotToken])],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {} 