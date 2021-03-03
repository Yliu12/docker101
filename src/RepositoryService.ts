import * as Keyv from 'keyv';
import { KeyvFile } from 'keyv-file';

export class MyKeyv<T=any> extends Keyv<T> {
  query<T>(callback: (value: string, key: string) => boolean): T[] {
    // bite me
    const data = (this as any).opts.store._cache as Map<string, string>;
    const result: T[] = [];

    data.forEach((v:any, k, _map) => {
      if (callback(v.value, k)) {
        result.push(JSON.parse(v.value).value as T);
      }
    });
    return result;
  }
}

export enum RepositoryType {
  User = 'USER',
  Message = 'MESSAGE'
}

class RepositoryService {
  private repositoryMap: Map<string, MyKeyv> = new Map();
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

        this.repositoryMap.set(type, new MyKeyv(keyvOptions));
      }
    } catch (error) {
      console.error('Caught error while initializing repository.', error);
    }
  }

  get<T>(type: RepositoryType): MyKeyv<T> {
    return this.repositoryMap.get(type) as MyKeyv<T>;
  }
}

export const repos = new RepositoryService();