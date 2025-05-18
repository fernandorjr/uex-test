import type { IStorageParams } from './storage.interface'

const defaultParams: IStorageParams = {
  persist: true
}

const useStorage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setStorage = (key: string, value: any, opts: IStorageParams = defaultParams) => {
    if (opts.persist) {
      localStorage.set(key, JSON.stringify(value))
    } else {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  const getStorage = (key: string, opts: IStorageParams = defaultParams) => {
    if (opts.persist) {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } else {
      const value = sessionStorage.getItem(key)
      return value ? JSON.parse(value) : null
    }
  }

  const delStorage = (key: string, opts: IStorageParams = defaultParams) => {
    if (opts.persist) {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
    }
  }

  return {
    setStorage,
    getStorage,
    delStorage
  }
}

export default useStorage
