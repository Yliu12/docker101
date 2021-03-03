import * as Keyv from 'keyv';
import { repos, RepositoryType } from "./RepositoryService";
import { User } from './UserService';
import { v4 as uuid } from 'uuid';

export class MessageService {
    messageRepo: Keyv<Message>;
    constructor() {
        this.messageRepo = repos.get(RepositoryType.Message);
    }

    async get(id: string): Promise<Message|undefined> {
        return await this.messageRepo.get(id);
    }

    async set(message: Message): Promise<Message> {
        const id = uuid();
        message.id = id;
        message.time = new Date().toISOString();
        await this.messageRepo.set(id, message);
        return message;
    }
    
}

export interface Message {
    from: User;
    to: User;
    message: string;
    time?: string;
    id?: string;
}