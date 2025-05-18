import type { TBaseEntityAdapter } from "../adapters.interface";

export interface ILocalStorageAdapter<T> {
  getAll(): Promise<T[]>;
  getOne(query: Partial<TBaseEntityAdapter<T>>): Promise<T | undefined>;
  save(item: T): Promise<void>;
  create(item: T): TBaseEntityAdapter<T>;
  update(id: string, updatedItem: Partial<TBaseEntityAdapter<T>>): Promise<void>;
  delete(id: string): Promise<void>;
}