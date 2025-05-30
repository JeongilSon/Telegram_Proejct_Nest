import { LinkService } from './link.service';
export declare class LinkController {
    private readonly linkService;
    constructor(linkService: LinkService);
    findAll(): Promise<import("../../entities/link.entity").Link[]>;
    create(createLinkDto: any): Promise<any>;
    remove(name: string): Promise<any>;
}
