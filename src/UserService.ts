import * as Keyv from 'keyv';
import { repos, RepositoryType } from "./RepositoryService";
import { v4 as uuid } from 'uuid';

export class UserService {
    userRepo: Keyv;
    constructor() {
        this.userRepo = repos.get(RepositoryType.User);
    }

    async get(id: string): Promise<User> {
        return await this.userRepo.get(id);
    }
    async set(user: User): Promise<User> {
        user.id = uuid();
        await this.userRepo.set(user.id, user);
        return user;
    }
}

export interface User {
    name: string;
    id?: string;
}