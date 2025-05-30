import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    private logger;
    private server;
    constructor(chatService: ChatService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinChat(data: {
        chatId: string;
    }, client: Socket): void;
    handleLeaveChat(data: {
        chatId: string;
    }, client: Socket): void;
    handleMessage(data: {
        chatId: string;
        content: string;
    }, client: Socket): Promise<void>;
    handleAdminReply(data: {
        chatId: string;
        text: string;
    }, client: Socket): Promise<void>;
    broadcastToChat(chatId: string, event: string, data: any): void;
    broadcastToAll(event: string, data: any): void;
}
