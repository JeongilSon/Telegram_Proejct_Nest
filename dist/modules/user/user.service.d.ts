import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(chatId: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(chatId: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(chatId: string): Promise<void>;
    updateUserQuestion(chatId: string, question: string): Promise<User>;
    findByChatId(chatId: string): Promise<User | null>;
}
