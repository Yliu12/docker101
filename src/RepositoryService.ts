import * as Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';

export enum RepositoryType {
    User = 'USER',
    Message='MESSAGE'
}

class RepositoryService {
    private repositoryMap: Map<string, Keyv> = new Map();
    constructor() {    
      try {
        for (const type of Object.values(RepositoryType)) {
          const store = new KeyvFile({
              filename: `./db.${type.toLowerCase()}.json`
            });
  
          const keyvOptions: Keyv.Options<any> = {
            store,
            namespace: type,
            ttl: 1 * 7 * 24 * 60 * 60 * 1000,// one week
          };
  
          this.repositoryMap.set(type, new Keyv(keyvOptions));
        }
      } catch (error) {
        console.error('Caught error while initializing repository.', error);
      }
    }
  
    get<T>(type: RepositoryType): Keyv<T> {
      return this.repositoryMap.get(type) as Keyv<T>;
    }
  }

export const repos = new RepositoryService();