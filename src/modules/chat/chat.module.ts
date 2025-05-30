/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Controllers/LivechatController.cs
 * 
 * 기능:
 * - 실시간 채팅 메시지 관리
 * - Socket.IO를 통한 실시간 통신
 * - 관리자-사용자 간 메시지 송수신
 * - 메시지 읽음 처리
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livechat } from '../../entities/livechat.entity';
import { User } from '../../entities/user.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Livechat, User])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {} 