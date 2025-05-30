import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { AdminMessageDto } from './dto/admin-message.dto';
import { BotMessageDto } from './dto/bot-message.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(sendMessageDto: SendMessageDto): Promise<{
        success: boolean;
        message: string;
    }>;
    sendAdminReply(adminMessageDto: AdminMessageDto): Promise<{
        success: boolean;
        message: string;
    }>;
    receiveFromBot(botMessageDto: BotMessageDto): Promise<{
        success: boolean;
    }>;
    getMessages(chatId: string, since?: string): Promise<{
        id: number;
        content: string;
        username: string;
        timestamp: Date;
        isFromAdmin: boolean;
        isRead: boolean;
    }[]>;
    getChatUsers(): Promise<any[]>;
    markAsRead(chatId: string): Promise<{
        success: boolean;
        count: number;
    }>;
    deleteChat(chatId: string): Promise<{
        success: boolean;
        message: string;
        count: number;
    }>;
    getUnprocessedAdminMessages(): Promise<{
        id: number;
        chatId: string;
        content: string;
        timestamp: Date;
    }[]>;
    markAsProcessed(messageId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
