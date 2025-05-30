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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const account_entity_1 = require("../../entities/account.entity");
let AuthService = class AuthService {
    accountRepository;
    jwtService;
    constructor(accountRepository, jwtService) {
        this.accountRepository = accountRepository;
        this.jwtService = jwtService;
    }
    async findAll() {
        return this.accountRepository.find({
            order: { id: 'DESC' },
        });
    }
    async create(createAccountDto) {
        const { id, pw } = createAccountDto;
        const existingAccount = await this.accountRepository.findOne({ where: { id } });
        if (existingAccount) {
            throw new common_1.ConflictException('이미 존재하는 계정 ID입니다.');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pw, saltRounds);
        const account = this.accountRepository.create({
            id,
            pw: hashedPassword,
        });
        return this.accountRepository.save(account);
    }
    async remove(id) {
        const account = await this.accountRepository.findOne({ where: { id } });
        if (!account) {
            throw new common_1.NotFoundException(`이름이 '${id}'인 아이디를 찾을 수 없습니다.`);
        }
        await this.accountRepository.remove(account);
        return { success: true, message: '계정이 성공적으로 삭제되었습니다.' };
    }
    async login(loginDto) {
        const { id, pw } = loginDto;
        const account = await this.accountRepository.findOne({ where: { id } });
        if (!account) {
            throw new common_1.UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
        const isPasswordValid = await bcrypt.compare(pw, account.pw);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
        const payload = { sub: account.id, username: account.id };
        const access_token = this.jwtService.sign(payload);
        return {
            access_token,
            success: true,
            message: '로그인 성공',
        };
    }
    async validateUser(userId) {
        return this.accountRepository.findOne({ where: { id: userId } });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map