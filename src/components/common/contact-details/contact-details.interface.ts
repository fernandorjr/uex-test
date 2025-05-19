import type { IContact } from "@/modules/contact/contact.interface"
import type { TErrorForm } from "@/types"

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

export interface IContactDetailsProps {
  userId: string;
  contact: IContact;
}

export type TErrorContactForm = TErrorForm<Omit<IContactForm, 'complement'>>