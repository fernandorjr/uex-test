import type { IContact } from "@/modules/contact/contact.interface"

export interface IModalContactDetailsProps {
  open: boolean
  contact: IContact | null
  onClose: () => void
  userId: string
}