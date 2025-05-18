import type { IGetParams, TBaseEntityAdapter } from '../adapters.interface'
import type { LocalStorageAdapter } from '../local-storage'

class Repository<T> {
  constructor(private _storage: LocalStorageAdapter<T>) {}
  
  async getAll(query?: Partial<T>, params?: IGetParams): Promise<T[]> {
    return await this._storage.getAll(query, params)
  }

  async getOne(query: Partial<TBaseEntityAdapter<T>>, params?: IGetParams): Promise<T | undefined> {
    return await this._storage.getOne(query, params)
  }

  async save(item: T): Promise<void> {
    return await this._storage.save(item)
  }

  async update(id: string, updatedItem: Partial<TBaseEntityAdapter<T>>): Promise<void> {
    await this._storage.update(id, updatedItem)
  }

  async delete(id: string): Promise<void> {
    await this._storage.delete(id)
  }

}

export default Repository
