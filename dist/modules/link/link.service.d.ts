import { Repository } from 'typeorm';
import { Link } from '../../entities/link.entity';
export declare class LinkService {
    private linkRepository;
    constructor(linkRepository: Repository<Link>);
    findAll(): Promise<Link[]>;
    create(createLinkDto: any): Promise<any>;
    remove(name: string): Promise<any>;
}
