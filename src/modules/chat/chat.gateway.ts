/**
 * Socket.IO 실시간 채팅 게이트웨이
 * .NET Core SignalR과 유사한 기능을 Socket.IO로 구현
 */

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('ChatGateway');
  private server: Server;

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    this.server = server;
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
    client.join(`chat:${data.chatId}`);
    this.logger.log(`Client ${client.id} joined chat: ${data.chatId}`);
  }

  @SubscribeMessage('leaveChat')
  handleLeaveChat(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
    client.leave(`chat:${data.chatId}`);
    this.logger.log(`Client ${client.id} left chat: ${data.chatId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { chatId: string; content: string }, @ConnectedSocket() client: Socket) {
    try {
      // 메시지 저장
      await this.chatService.sendMessage({
        chatId: data.chatId,
        content: data.content,
      });

      // 해당 채팅방의 모든 클라이언트에게 실시간 전송
      this.server.to(`chat:${data.chatId}`).emit('newMessage', {
        chatId: data.chatId,
        content: data.content,
        timestamp: new Date(),
        isFromAdmin: false,
      });

      this.logger.log(`Message sent to chat: ${data.chatId}`);
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('adminReply')
  async handleAdminReply(@MessageBody() data: { chatId: string; text: string }, @ConnectedSocket() client: Socket) {
    try {
      // 관리자 메시지 저장
      await this.chatService.sendAdminReply({
        chatId: data.chatId,
        text: data.text,
      });

      // 해당 채팅방의 모든 클라이언트에게 실시간 전송
      this.server.to(`chat:${data.chatId}`).emit('newMessage', {
        chatId: data.chatId,
        content: data.text,
        timestamp: new Date(),
        isFromAdmin: true,
        username: '관리자',
      });

      this.logger.log(`Admin reply sent to chat: ${data.chatId}`);
    } catch (error) {
      this.logger.error(`Error sending admin reply: ${error.message}`);
      client.emit('error', { message: 'Failed to send admin reply' });
    }
  }

  // 외부에서 호출할 수 있는 메서드 (서비스에서 사용)
  broadcastToChat(chatId: string, event: string, data: any) {
    this.server.to(`chat:${chatId}`).emit(event, data);
  }

  broadcastToAll(event: string, data: any) {
    this.server.emit(event, data);
  }
} 