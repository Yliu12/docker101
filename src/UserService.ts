import { MyKeyv, repos, RepositoryType } from "./RepositoryService";
import { v4 as uuid } from 'uuid';

export class UserService {
    userRepo: MyKeyv;
    constructor() {
        this.userRepo = repos.get(RepositoryType.User);
    }

    async get(id: string): Promise<User> {
        JSON.stringify(this.userRepo);
        return await this.userRepo.get(id);
    }
    async set(user: User): Promise<User> {
        user.id = uuid();
        await this.userRepo.set(user.id, user);
        return user;
    }

    async list(): Promise<User[]> {
        return this.userRepo.query(()=>true);
    }
}

export interface User {
    name: string;
    id?: string;
}