import { atom } from 'jotai'
import type { ISystemState } from './system.state.interface'


const initialState: ISystemState = {
  checking: true,
  refreshing: false
} as ISystemState

export const systemAtom = atom(initialState, (get, set, payload: Partial<ISystemState>) => {
  set(systemAtom, {
    ...get(systemAtom),
    ...payload
  })
})
