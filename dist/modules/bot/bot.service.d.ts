import { Repository } from 'typeorm';
import { BotToken } from '../../entities/bot-token.entity';
import { ChatBotTokenDto } from './dto/chatbot-token.dto';
import { MainBotTokenDto } from './dto/mainbot-token.dto';
export declare class BotService {
    private botTokenRepository;
    constructor(botTokenRepository: Repository<BotToken>);
    getBotTokens(): Promise<BotToken>;
    saveChatBotToken(chatBotTokenDto: ChatBotTokenDto): Promise<{
        success: boolean;
        message: string;
    }>;
    saveMainBotToken(mainBotTokenDto: MainBotTokenDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
