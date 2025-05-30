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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotMessage = void 0;
const typeorm_1 = require("typeorm");
let BotMessage = class BotMessage {
    id;
    welcome_Message;
    question_Message;
    created_at;
    updated_at;
};
exports.BotMessage = BotMessage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BotMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'welcome_message', nullable: true }),
    __metadata("design:type", String)
], BotMessage.prototype, "welcome_Message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'question_message', nullable: true }),
    __metadata("design:type", String)
], BotMessage.prototype, "question_Message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BotMessage.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BotMessage.prototype, "updated_at", void 0);
exports.BotMessage = BotMessage = __decorate([
    (0, typeorm_1.Entity)('bot_message_table')
], BotMessage);
//# sourceMappingURL=bot-message.entity.js.map