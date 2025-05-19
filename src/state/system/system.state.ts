import { atom } from 'jotai'
import type { ISystemState } from './system.state.interface'

const initialState: ISystemState = {
  checking: true,
  refreshing: false
}

export const systemAtom = atom(initialState, (get, set, payload: Partial<ISystemStore>) => {
  set(systemAtom, {
    ...get(systemAtom),
    ...payload
  })
})
