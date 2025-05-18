import type { Contact } from "../contact-list/contact-list.component";

export interface IModalAddContactProps {
  open: boolean;
  onClose: () => void;
  onSave: (contact: Contact) => void;
};