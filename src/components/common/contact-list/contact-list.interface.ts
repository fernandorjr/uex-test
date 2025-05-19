import type { IContact } from "@/modules/contact/contact.interface";

export interface IContactListProps {
  userId: string;
  onSelect: (c: IContact) => void
}