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
exports.BotMessageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class BotMessageDto {
    chatId;
    text;
    username;
    timestamp;
}
exports.BotMessageDto = BotMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '채팅 ID', example: '123456789' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '채팅 ID는 필수입니다.' }),
    __metadata("design:type", String)
], BotMessageDto.prototype, "chatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '메시지 내용', example: '봇에서 전송된 메시지입니다.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '메시지 내용은 필수입니다.' }),
    __metadata("design:type", String)
], BotMessageDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '사용자 이름', example: '홍길동', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BotMessageDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '타임스탬프', example: '2024-01-01T00:00:00Z', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BotMessageDto.prototype, "timestamp", void 0);
//# sourceMappingURL=bot-message.dto.js.map