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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chat_service_1 = require("./chat.service");
const send_message_dto_1 = require("./dto/send-message.dto");
const admin_message_dto_1 = require("./dto/admin-message.dto");
const bot_message_dto_1 = require("./dto/bot-message.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
let ChatController = class ChatController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(sendMessageDto) {
        return this.chatService.sendMessage(sendMessageDto);
    }
    async sendAdminReply(adminMessageDto) {
        return this.chatService.sendAdminReply(adminMessageDto);
    }
    async receiveFromBot(botMessageDto) {
        return this.chatService.receiveFromBot(botMessageDto);
    }
    async getMessages(chatId, since) {
        const sinceDate = since ? new Date(since) : undefined;
        return this.chatService.getMessages(chatId, sinceDate);
    }
    async getChatUsers() {
        return this.chatService.getChatUsers();
    }
    async markAsRead(chatId) {
        return this.chatService.markAsRead(chatId);
    }
    async deleteChat(chatId) {
        return this.chatService.deleteChat(chatId);
    }
    async getUnprocessedAdminMessages() {
        return this.chatService.getUnprocessedAdminMessages();
    }
    async markAsProcessed(messageId) {
        return this.chatService.markAsProcessed(messageId);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: '메시지 전송' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '메시지가 성공적으로 저장됨' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('admin-reply'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자 답변 전송' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '관리자 메시지가 성공적으로 저장됨' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_message_dto_1.AdminMessageDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendAdminReply", null);
__decorate([
    (0, common_1.Post)('receive-from-bot'),
    (0, swagger_1.ApiOperation)({ summary: '텔레그램 봇으로부터 메시지 수신' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '봇 메시지가 성공적으로 저장됨' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bot_message_dto_1.BotMessageDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "receiveFromBot", null);
__decorate([
    (0, common_1.Get)(':chatId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '특정 사용자와의 메시지 기록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '메시지 기록 반환' }),
    __param(0, (0, common_1.Param)('chatId')),
    __param(1, (0, common_1.Query)('since')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '모든 채팅 사용자 목록 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '채팅 사용자 목록 반환' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatUsers", null);
__decorate([
    (0, common_1.Put)(':chatId/mark-as-read'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '메시지 읽음 처리' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '메시지가 읽음으로 처리됨' }),
    __param(0, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Delete)(':chatId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '채팅 대화 삭제' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '채팅 내역이 삭제됨' }),
    __param(0, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteChat", null);
__decorate([
    (0, common_1.Get)('unprocessed-admin-messages'),
    (0, swagger_1.ApiOperation)({ summary: '처리되지 않은 관리자 메시지 조회 (봇 전용)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '미처리 관리자 메시지 목록 반환' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUnprocessedAdminMessages", null);
__decorate([
    (0, common_1.Put)('mark-as-processed/:messageId'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 메시지 처리 완료 표시 (봇 전용)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '메시지가 처리 완료로 표시됨' }),
    __param(0, (0, common_1.Param)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "markAsProcessed", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('chat'),
    (0, common_1.Controller)('api/livechat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map