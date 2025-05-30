/**
 * 기존 .NET Core 프로젝트에서 분리된 실시간 채팅 로직
 * 원본: Telegram_Project2_Web/Controllers/LivechatController.cs
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livechat } from '../../entities/livechat.entity';
import { User } from '../../entities/user.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { AdminMessageDto } from './dto/admin-message.dto';
import { BotMessageDto } from './dto/bot-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Livechat)
    private livechatRepository: Repository<Livechat>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto): Promise<{ success: boolean; message: string }> {
    const { chatId, content } = sendMessageDto;

    const livechat = this.livechatRepository.create({
      chatId,
      content,
      timestamp: new Date(),
      isRead: false,
      isFromAdmin: false,
    });

    await this.livechatRepository.save(livechat);

    return { success: true, message: '메시지가 저장되었습니다.' };
  }

  async sendAdminReply(adminMessageDto: AdminMessageDto): Promise<{ success: boolean; message: string }> {
    const { chatId, text } = adminMessageDto;

    const livechat = this.livechatRepository.create({
      chatId,
      content: text,
      username: '관리자',
      timestamp: new Date(),
      isFromAdmin: true,
      isRead: false,
    });

    await this.livechatRepository.save(livechat);

    return { success: true, message: '메시지가 저장되었습니다. 봇이 곧 전송할 예정입니다.' };
  }

  async receiveFromBot(botMessageDto: BotMessageDto): Promise<{ success: boolean }> {
    const { chatId, text, username } = botMessageDto;

    const livechat = this.livechatRepository.create({
      chatId,
      content: text,
      username,
      timestamp: new Date(),
      isFromAdmin: false,
      isRead: false,
    });

    await this.livechatRepository.save(livechat);

    return { success: true };
  }

  async getMessages(chatId: string, since?: Date) {
    let query = this.livechatRepository
      .createQueryBuilder('livechat')
      .where('livechat.chatId = :chatId', { chatId });

    if (since) {
      query = query.andWhere('livechat.timestamp > :since', { since });
    }

    const messages = await query
      .orderBy('livechat.timestamp', 'ASC')
      .getMany();

    return messages.map(m => ({
      id: m.id,
      content: m.content,
      username: m.username || (m.isFromAdmin ? '관리자' : '사용자'),
      timestamp: m.timestamp,
      isFromAdmin: m.isFromAdmin,
      isRead: m.isRead,
    }));
  }

  async getChatUsers() {
    const results = await this.livechatRepository
      .createQueryBuilder('livechat')
      .select([
        'livechat.chatId AS chatId',
        'MAX(livechat.timestamp) AS lastTimestamp',
        'COUNT(CASE WHEN livechat.isRead = false AND livechat.isFromAdmin = false THEN 1 END) AS unreadCount'
      ])
      .groupBy('livechat.chatId')
      .orderBy('lastTimestamp', 'DESC')
      .getRawMany();

    const chatUsers: any[] = [];
    for (const result of results) {
      const lastMessage = await this.livechatRepository
        .createQueryBuilder('livechat')
        .where('livechat.chatId = :chatId', { chatId: result.chatId })
        .orderBy('livechat.timestamp', 'DESC')
        .getOne();

      const user = await this.livechatRepository
        .createQueryBuilder('livechat')
        .where('livechat.chatId = :chatId', { chatId: result.chatId })
        .andWhere('livechat.username IS NOT NULL')
        .andWhere('livechat.isFromAdmin = false')
        .orderBy('livechat.timestamp', 'DESC')
        .getOne();

      chatUsers.push({
        chatId: result.chatId,
        lastMessage: lastMessage?.content || '',
        lastTimestamp: result.lastTimestamp,
        username: user?.username || '사용자',
        unreadCount: parseInt(result.unreadCount) || 0,
      });
    }

    return chatUsers;
  }

  async markAsRead(chatId: string): Promise<{ success: boolean; count: number }> {
    const result = await this.livechatRepository
      .createQueryBuilder()
      .update(Livechat)
      .set({ isRead: true })
      .where('chatId = :chatId', { chatId })
      .andWhere('isRead = false')
      .andWhere('isFromAdmin = false')
      .execute();

    return { success: true, count: result.affected || 0 };
  }

  async deleteChat(chatId: string): Promise<{ success: boolean; message: string; count: number }> {
    const messages = await this.livechatRepository.find({ where: { chatId } });

    if (messages.length === 0) {
      throw new NotFoundException('채팅 내역이 없습니다.');
    }

    await this.livechatRepository.remove(messages);

    return { success: true, message: '채팅 내역이 삭제되었습니다.', count: messages.length };
  }

  async getUnprocessedAdminMessages() {
    const messages = await this.livechatRepository.find({
      where: { isFromAdmin: true, isRead: false },
      order: { timestamp: 'ASC' },
    });

    return messages.map(m => ({
      id: m.id,
      chatId: m.chatId,
      content: m.content,
      timestamp: m.timestamp,
    }));
  }

  async markAsProcessed(messageId: number): Promise<{ success: boolean; message: string }> {
    const message = await this.livechatRepository.findOne({ where: { id: messageId } });

    if (!message) {
      throw new NotFoundException('메시지를 찾을 수 없습니다.');
    }

    message.isRead = true;
    await this.livechatRepository.save(message);

    return { success: true, message: '메시지가 처리 완료로 표시되었습니다.' };
  }
} 