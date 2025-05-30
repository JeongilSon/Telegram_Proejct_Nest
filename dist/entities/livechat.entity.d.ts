import { User } from './user.entity';
export declare class Livechat {
    id: number;
    chatId: string;
    content: string;
    username: string;
    isFromAdmin: boolean;
    isRead: boolean;
    timestamp: Date;
    user: User;
}
