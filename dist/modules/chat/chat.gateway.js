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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
let ChatGateway = class ChatGateway {
    chatService;
    logger = new common_1.Logger('ChatGateway');
    server;
    constructor(chatService) {
        this.chatService = chatService;
    }
    afterInit(server) {
        this.server = server;
        this.logger.log('WebSocket Gateway initialized');
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinChat(data, client) {
        client.join(`chat:${data.chatId}`);
        this.logger.log(`Client ${client.id} joined chat: ${data.chatId}`);
    }
    handleLeaveChat(data, client) {
        client.leave(`chat:${data.chatId}`);
        this.logger.log(`Client ${client.id} left chat: ${data.chatId}`);
    }
    async handleMessage(data, client) {
        try {
            await this.chatService.sendMessage({
                chatId: data.chatId,
                content: data.content,
            });
            this.server.to(`chat:${data.chatId}`).emit('newMessage', {
                chatId: data.chatId,
                content: data.content,
                timestamp: new Date(),
                isFromAdmin: false,
            });
            this.logger.log(`Message sent to chat: ${data.chatId}`);
        }
        catch (error) {
            this.logger.error(`Error sending message: ${error.message}`);
            client.emit('error', { message: 'Failed to send message' });
        }
    }
    async handleAdminReply(data, client) {
        try {
            await this.chatService.sendAdminReply({
                chatId: data.chatId,
                text: data.text,
            });
            this.server.to(`chat:${data.chatId}`).emit('newMessage', {
                chatId: data.chatId,
                content: data.text,
                timestamp: new Date(),
                isFromAdmin: true,
                username: '관리자',
            });
            this.logger.log(`Admin reply sent to chat: ${data.chatId}`);
        }
        catch (error) {
            this.logger.error(`Error sending admin reply: ${error.message}`);
            client.emit('error', { message: 'Failed to send admin reply' });
        }
    }
    broadcastToChat(chatId, event, data) {
        this.server.to(`chat:${chatId}`).emit(event, data);
    }
    broadcastToAll(event, data) {
        this.server.emit(event, data);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('joinChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('adminReply'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleAdminReply", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map