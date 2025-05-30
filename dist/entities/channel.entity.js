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
exports.Channel = void 0;
const typeorm_1 = require("typeorm");
let Channel = class Channel {
    channel_Code;
    channel_Name;
    channel_Url;
    channel_Chat_Content;
    created_at;
    updated_at;
};
exports.Channel = Channel;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 255, name: 'channel_code' }),
    __metadata("design:type", String)
], Channel.prototype, "channel_Code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'channel_name' }),
    __metadata("design:type", String)
], Channel.prototype, "channel_Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, name: 'channel_url', nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "channel_Url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "channel_Chat_Content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Channel.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Channel.prototype, "updated_at", void 0);
exports.Channel = Channel = __decorate([
    (0, typeorm_1.Entity)('channel_list_table')
], Channel);
//# sourceMappingURL=channel.entity.js.map