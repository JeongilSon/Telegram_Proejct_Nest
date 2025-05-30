import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginDto } from './dto/login.dto';
import { Account } from '../../entities/account.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
