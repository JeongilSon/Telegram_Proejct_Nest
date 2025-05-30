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
exports.BotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bot_service_1 = require("./bot.service");
const chatbot_token_dto_1 = require("./dto/chatbot-token.dto");
const mainbot_token_dto_1 = require("./dto/mainbot-token.dto");
let BotController = class BotController {
    botService;
    constructor(botService) {
        this.botService = botService;
    }
    async getBotTokens() {
        return this.botService.getBotTokens();
    }
    async saveChatBotToken(chatBotTokenDto) {
        return this.botService.saveChatBotToken(chatBotTokenDto);
    }
    async saveMainBotToken(mainBotTokenDto) {
        return this.botService.saveMainBotToken(mainBotTokenDto);
    }
};
exports.BotController = BotController;
__decorate([
    (0, common_1.Get)('tokens'),
    (0, swagger_1.ApiOperation)({ summary: '현재 설정된 봇 토큰들 조회' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BotController.prototype, "getBotTokens", null);
__decorate([
    (0, common_1.Post)('chatbot'),
    (0, swagger_1.ApiOperation)({ summary: 'ChatBot 토큰 저장/업데이트' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatbot_token_dto_1.ChatBotTokenDto]),
    __metadata("design:returntype", Promise)
], BotController.prototype, "saveChatBotToken", null);
__decorate([
    (0, common_1.Post)('mainbot'),
    (0, swagger_1.ApiOperation)({ summary: 'MainBot 토큰 저장/업데이트' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mainbot_token_dto_1.MainBotTokenDto]),
    __metadata("design:returntype", Promise)
], BotController.prototype, "saveMainBotToken", null);
exports.BotController = BotController = __decorate([
    (0, swagger_1.ApiTags)('bot'),
    (0, common_1.Controller)('api/bot'),
    __metadata("design:paramtypes", [bot_service_1.BotService])
], BotController);
//# sourceMappingURL=bot.controller.js.map