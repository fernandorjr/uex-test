import { sleep } from '@/utils/sleep'
import { v4 as uuidv4 } from 'uuid'

import type { ILocalStorageAdapter } from './local-storage.adapter.interfaces'
import type { IGetParams, TBaseEntityAdapter } from '../adapters.interface'

class LocalStorageAdapter<T> implements ILocalStorageAdapter<T> {
  constructor(private readonly _storageKey: string) {
    if (typeof _storageKey !== 'string') throw new Error('A chave do LocalStorageAdapter deve ser uma string.')

    if (!localStorage.getItem(_storageKey)) localStorage.setItem(_storageKey, JSON.stringify([]))
  }

  async getAll(query?: Partial<T>, params?: IGetParams): Promise<T[]> {
    await sleep()

    const dataRaw = localStorage.getItem(this._storageKey)

    if (!dataRaw) return []

    const data = JSON.parse(dataRaw) as T[]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredData = data.filter((item: any) => Object.entries(query || {}).every(([key, value]) => item[key] === value))

    if (!params) return filteredData

    const sortedData = data.sort((a: T, b: T) => {
      const aValue = a[params.orderBy as keyof T]
      const bValue = b[params.orderBy as keyof T]

      if (params.order === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return sortedData
  }

  async getOne(query: Partial<TBaseEntityAdapter<T>>, params?: IGetParams): Promise<T | undefined> {
    await sleep()

    const data = await this.getAll(query)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!params) return data.find((item: any) => Object.entries(query).every(([key, value]) => item[key] === value))

    const sortedData = data.sort((a: T, b: T) => {
      const aValue = a[params.orderBy as keyof T]
      const bValue = b[params.orderBy as keyof T]

      if (params.order === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return sortedData.find((item: any) => Object.entries(query).every(([key, value]) => item[key] === value))
  }

  create(item: T): TBaseEntityAdapter<T> {
    return {
      ...item,
      id: uuidv4(),
      createAt: new Date(),
      updatedAt: new Date()
    }
  }

  async save(item: T): Promise<void> {
    await sleep()

    const data = await this.getAll()

    const newData = this.create(item)

    data.push(newData)

    localStorage.setItem(this._storageKey, JSON.stringify(data))
  }

  async update(id: string, updatedItem: Partial<TBaseEntityAdapter<T>>): Promise<void> {
    await sleep()
    const data = await this.getAll()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedData = data.map((item: any) =>
      item.id === id ? { ...item, ...updatedItem, updatedAt: new Date() } : item
    )
    localStorage.setItem(this._storageKey, JSON.stringify(updatedData))
  }

  async delete(id: string): Promise<void> {
    await sleep()

    const data = await this.getAll()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData = data.filter((item: any) => item.id !== id)

    localStorage.setItem(this._storageKey, JSON.stringify(updateData))
  }

  async deleteMany(query: Partial<T>): Promise<void> {
    await sleep()
    const data = await this.getAll()
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedData = data.filter((item: any) =>
      Object.entries(query).every(([key, value]) => item[key] !== value)
    )
    localStorage.setItem(this._storageKey, JSON.stringify(updatedData))
  }
}

export default LocalStorageAdapter
