import { MyKeyv, repos, RepositoryType } from "./RepositoryService";
import { User } from './UserService';
import { v4 as uuid } from 'uuid';

export class MessageService {
    messageRepo: MyKeyv<Message>;
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

    async list(user1:string, user2?:string): Promise<Message[]> {
        // obviously a bug
        return this.messageRepo.query<Message>((v,_k)=> {
            if (v.indexOf(user1)>-1){
                return true;
            }
            if (user2 && v.indexOf(user2)>-1){
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