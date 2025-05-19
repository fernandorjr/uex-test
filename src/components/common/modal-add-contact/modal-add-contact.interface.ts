import type { TErrorForm } from '@/types'
export interface IModalAddContactProps {
  open: boolean
  userId: string
  onClose: () => void
}

export interface IContactForm {
  name: string
  cpf: string
  phone: string
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

export type TErrorContactForm = TErrorForm<Omit<IContactForm, 'complement'>>
