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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const livechat_entity_1 = require("../../entities/livechat.entity");
const user_entity_1 = require("../../entities/user.entity");
let ChatService = class ChatService {
    livechatRepository;
    userRepository;
    constructor(livechatRepository, userRepository) {
        this.livechatRepository = livechatRepository;
        this.userRepository = userRepository;
    }
    async sendMessage(sendMessageDto) {
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
    async sendAdminReply(adminMessageDto) {
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
    async receiveFromBot(botMessageDto) {
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
    async getMessages(chatId, since) {
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
        const chatUsers = [];
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
    async markAsRead(chatId) {
        const result = await this.livechatRepository
            .createQueryBuilder()
            .update(livechat_entity_1.Livechat)
            .set({ isRead: true })
            .where('chatId = :chatId', { chatId })
            .andWhere('isRead = false')
            .andWhere('isFromAdmin = false')
            .execute();
        return { success: true, count: result.affected || 0 };
    }
    async deleteChat(chatId) {
        const messages = await this.livechatRepository.find({ where: { chatId } });
        if (messages.length === 0) {
            throw new common_1.NotFoundException('채팅 내역이 없습니다.');
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
    async markAsProcessed(messageId) {
        const message = await this.livechatRepository.findOne({ where: { id: messageId } });
        if (!message) {
            throw new common_1.NotFoundException('메시지를 찾을 수 없습니다.');
        }
        message.isRead = true;
        await this.livechatRepository.save(message);
        return { success: true, message: '메시지가 처리 완료로 표시되었습니다.' };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(livechat_entity_1.Livechat)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map