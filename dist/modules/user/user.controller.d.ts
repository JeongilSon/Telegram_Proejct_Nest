import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(chatId: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(chatId: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(chatId: string): Promise<void>;
}
