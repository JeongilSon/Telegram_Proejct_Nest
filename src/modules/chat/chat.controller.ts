/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Controllers/LivechatController.cs
 * 
 * 변경사항:
 * - [Route("api/[controller]")] → @Controller('api/livechat')
 * - [HttpPost("Send")] → @Post('send')
 * - [HttpPost("AdminReply")] → @Post('admin-reply')
 * - [HttpGet("{chatId}")] → @Get(':chatId')
 * - [HttpGet("Users")] → @Get('users')
 * - [HttpPut("{chatId}/MarkAsRead")] → @Put(':chatId/mark-as-read')
 * - [HttpDelete("{chatId}")] → @Delete(':chatId')
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { AdminMessageDto } from './dto/admin-message.dto';
import { BotMessageDto } from './dto/bot-message.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('chat')
@Controller('api/livechat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  @ApiOperation({ summary: '메시지 전송' })
  @ApiResponse({ status: 201, description: '메시지가 성공적으로 저장됨' })
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @Post('admin-reply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 답변 전송' })
  @ApiResponse({ status: 201, description: '관리자 메시지가 성공적으로 저장됨' })
  async sendAdminReply(@Body() adminMessageDto: AdminMessageDto) {
    return this.chatService.sendAdminReply(adminMessageDto);
  }

  @Post('receive-from-bot')
  @ApiOperation({ summary: '텔레그램 봇으로부터 메시지 수신' })
  @ApiResponse({ status: 201, description: '봇 메시지가 성공적으로 저장됨' })
  async receiveFromBot(@Body() botMessageDto: BotMessageDto) {
    return this.chatService.receiveFromBot(botMessageDto);
  }

  @Get(':chatId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 사용자와의 메시지 기록 조회' })
  @ApiResponse({ status: 200, description: '메시지 기록 반환' })
  async getMessages(
    @Param('chatId') chatId: string,
    @Query('since') since?: string,
  ) {
    const sinceDate = since ? new Date(since) : undefined;
    return this.chatService.getMessages(chatId, sinceDate);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 채팅 사용자 목록 조회' })
  @ApiResponse({ status: 200, description: '채팅 사용자 목록 반환' })
  async getChatUsers() {
    return this.chatService.getChatUsers();
  }

  @Put(':chatId/mark-as-read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '메시지 읽음 처리' })
  @ApiResponse({ status: 200, description: '메시지가 읽음으로 처리됨' })
  async markAsRead(@Param('chatId') chatId: string) {
    return this.chatService.markAsRead(chatId);
  }

  @Delete(':chatId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '채팅 대화 삭제' })
  @ApiResponse({ status: 200, description: '채팅 내역이 삭제됨' })
  async deleteChat(@Param('chatId') chatId: string) {
    return this.chatService.deleteChat(chatId);
  }

  @Get('unprocessed-admin-messages')
  @ApiOperation({ summary: '처리되지 않은 관리자 메시지 조회 (봇 전용)' })
  @ApiResponse({ status: 200, description: '미처리 관리자 메시지 목록 반환' })
  async getUnprocessedAdminMessages() {
    return this.chatService.getUnprocessedAdminMessages();
  }

  @Put('mark-as-processed/:messageId')
  @ApiOperation({ summary: '관리자 메시지 처리 완료 표시 (봇 전용)' })
  @ApiResponse({ status: 200, description: '메시지가 처리 완료로 표시됨' })
  async markAsProcessed(@Param('messageId') messageId: number) {
    return this.chatService.markAsProcessed(messageId);
  }
} 