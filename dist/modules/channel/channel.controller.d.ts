import { ChannelService } from './channel.service';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    findAll(): Promise<import("../../entities/channel.entity").Channel[]>;
    create(createChannelDto: any): Promise<any>;
    remove(code: string): Promise<any>;
}
