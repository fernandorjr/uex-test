import { atom } from 'jotai'
import type { IContact } from '@/modules/contact/contact.interface'

export const contactListAtom = atom<IContact[]>([])
export const contactLoadingAtom = atom(false)
export const contactInitializedAtom = atom(false)