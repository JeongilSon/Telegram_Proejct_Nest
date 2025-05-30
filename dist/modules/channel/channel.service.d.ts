import { Repository } from 'typeorm';
import { Channel } from '../../entities/channel.entity';
export declare class ChannelService {
    private channelRepository;
    constructor(channelRepository: Repository<Channel>);
    findAll(): Promise<Channel[]>;
    create(createChannelDto: any): Promise<any>;
    remove(code: string): Promise<any>;
}
