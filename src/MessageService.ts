import { MyKeyv, repos, RepositoryType } from "./RepositoryService";
import { User } from './UserService';
import { v4 as uuid } from 'uuid';

export class MessageService {
    messageRepo: MyKeyv<Message>;
    repositoryType = RepositoryType.Message;
    constructor() {
        this.messageRepo = repos.get(this.repositoryType);
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

    async list(from?:string, to?:string): Promise<Message[]> {
        // KNOWN BUG, this searches for from or to match, not from and to match
        return this.messageRepo.query((v,_k)=> {
            if(!from && !to){
                return true;
            }
            if (v.from.id==from){
                return true;
            }
            if (v.to.id==to){
                return true;
            }
            return false
        }).sort((x,y)=>{
            return (new Date(y.time!)).getTime() - (new Date(x.time!)).getTime();
        });
    }
    
}

export interface Message {
    from: User;
    to: User;
    message: string;
    time?: string;
    id?: string;
}