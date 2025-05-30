import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private accountRepository;
    private jwtService;
    constructor(accountRepository: Repository<Account>, jwtService: JwtService);
    findAll(): Promise<Account[]>;
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        success: boolean;
        message: string;
    }>;
    validateUser(userId: string): Promise<Account | null>;
}
