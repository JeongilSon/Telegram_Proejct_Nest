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
exports.Mission = exports.MissionType = void 0;
const typeorm_1 = require("typeorm");
var MissionType;
(function (MissionType) {
    MissionType[MissionType["DAILY"] = 0] = "DAILY";
    MissionType[MissionType["MISSION"] = 1] = "MISSION";
    MissionType[MissionType["EVENT"] = 2] = "EVENT";
})(MissionType || (exports.MissionType = MissionType = {}));
let Mission = class Mission {
    mission_Name;
    mission_Type;
    mission_Rewords;
    mission_Chat_Content;
    created_at;
    updated_at;
};
exports.Mission = Mission;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Mission.prototype, "mission_Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Mission.prototype, "mission_Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Mission.prototype, "mission_Rewords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Mission.prototype, "mission_Chat_Content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Mission.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Mission.prototype, "updated_at", void 0);
exports.Mission = Mission = __decorate([
    (0, typeorm_1.Entity)('mission_table')
], Mission);
//# sourceMappingURL=mission.entity.js.map