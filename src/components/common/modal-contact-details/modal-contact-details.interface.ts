import type { Contact } from "../contact-list/contact-list.component"

export interface IModalContactDetailsProps {
  open: boolean
  contact: Contact | null
  onClose: () => void
  userId: string
}