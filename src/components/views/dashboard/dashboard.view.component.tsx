import { ContactList } from '@/components/common'
import './dashboard.view.style.css'
import { useState } from 'react'

export type Contact = {
  id: string
  nome: string
  cpf: string
  telefone: string
  endereco: string
  latitude: number
  longitude: number
}

export default function DashboardView() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact)
  }

  return (
    <div className="dashboard-content">
      <section className="contacts-panel">
        <ContactList onSelect={handleSelectContact} />
      </section>

      <section className="details-panel">
        <h2>Detalhes do Contato {selectedContact?.nome}</h2>
      </section>
    </div>
  )
}
