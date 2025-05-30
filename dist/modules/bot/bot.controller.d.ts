import { BotService } from './bot.service';
import { ChatBotTokenDto } from './dto/chatbot-token.dto';
import { MainBotTokenDto } from './dto/mainbot-token.dto';
export declare class BotController {
    private readonly botService;
    constructor(botService: BotService);
    getBotTokens(): Promise<import("../../entities/bot-token.entity").BotToken>;
    saveChatBotToken(chatBotTokenDto: ChatBotTokenDto): Promise<{
        success: boolean;
        message: string;
    }>;
    saveMainBotToken(mainBotTokenDto: MainBotTokenDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
