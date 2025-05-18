import { atom } from 'jotai'
import type { IUserStore } from './user.store.interface'

const initialState: IUserStore = {} as IUserStore

export const userAtom = atom(initialState, (get, set, payload: Partial<IUserStore>) => {
  set(userAtom, { ...get(userAtom), ...payload })
})
