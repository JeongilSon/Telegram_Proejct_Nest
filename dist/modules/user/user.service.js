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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.userRepository.find({
            order: { created_at: 'DESC' },
        });
    }
    async findOne(chatId) {
        const user = await this.userRepository.findOne({
            where: { chat_ID: chatId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with chat ID ${chatId} not found`);
        }
        return user;
    }
    async create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
    async update(chatId, updateUserDto) {
        await this.userRepository.update({ chat_ID: chatId }, updateUserDto);
        return this.findOne(chatId);
    }
    async remove(chatId) {
        const result = await this.userRepository.delete({ chat_ID: chatId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with chat ID ${chatId} not found`);
        }
    }
    async updateUserQuestion(chatId, question) {
        await this.userRepository.update({ chat_ID: chatId }, { user_Question: question });
        return this.findOne(chatId);
    }
    async findByChatId(chatId) {
        return this.userRepository.findOne({
            where: { chat_ID: chatId },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map