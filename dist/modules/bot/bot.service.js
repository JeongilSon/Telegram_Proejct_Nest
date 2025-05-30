"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bot_token_entity_1 = require("../../entities/bot-token.entity");
let BotService = class BotService {
    botTokenRepository;
    constructor(botTokenRepository) {
        this.botTokenRepository = botTokenRepository;
    }
    async getBotTokens() {
        const botToken = await this.botTokenRepository.findOne({ where: {} });
        if (!botToken) {
            return {
                id: 0,
                chat_bot_token: '',
                main_bot_token: '',
                created_at: new Date(),
                updated_at: new Date(),
            };
        }
        return botToken;
    }
    async saveChatBotToken(chatBotTokenDto) {
        let botToken = await this.botTokenRepository.findOne({ where: {} });
        if (!botToken) {
            botToken = this.botTokenRepository.create({
                chat_bot_token: chatBotTokenDto.chatBotToken,
            });
        }
        else {
            botToken.chat_bot_token = chatBotTokenDto.chatBotToken;
        }
        await this.botTokenRepository.save(botToken);
        return { success: true, message: 'ChatBot 토큰이 저장되었습니다.' };
    }
    async saveMainBotToken(mainBotTokenDto) {
        let botToken = await this.botTokenRepository.findOne({ where: {} });
        if (!botToken) {
            botToken = this.botTokenRepository.create({
                main_bot_token: mainBotTokenDto.mainBotToken,
            });
        }
        else {
            botToken.main_bot_token = mainBotTokenDto.mainBotToken;
        }
        await this.botTokenRepository.save(botToken);
        return { success: true, message: 'MainBot 토큰이 저장되었습니다.' };
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bot_token_entity_1.BotToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BotService);
//# sourceMappingURL=bot.service.js.map