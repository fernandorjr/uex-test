// @ts-nocheck
import { AppLoader, ModalAddContact } from '@/components/common'
import useContacts from '@/hooks/contacts/contacts.hook'
import { useEffect, useRef, useState } from 'react'
import type { IContactListProps } from './contact-list.interface'
import './contact-list.style.css'

export default function ContactList({ onSelect, userId }: IContactListProps) {
  const { fetchContacts, loading, contacts, initialized } = useContacts()
  const inputRef = useRef(null)

  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    fetchContacts({ userId }, { orderBy: 'name', order: sortOrder })
  }, [])

  const handleSortToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newOrder)
    fetchContacts({ userId, name: search }, { orderBy: 'name', order: newOrder })
  }

  useEffect(() => {
    if (search.length >= 3) {
      const timer = setTimeout(() => {
        fetchContacts({ userId, name: search }, { orderBy: 'name', order: sortOrder })
      }, 800)
      return () => clearTimeout(timer)
    }
    if (search.length === 0) {
      fetchContacts({ userId }, { orderBy: 'name', order: sortOrder })
    }
  }, [search, sortOrder])

  return (
    <div className="contact-list-container">
      <div className="contact-header">
        <md-outlined-text-field
          ref={inputRef}
          label="Buscar contato"
          placeholder="Digite nome ou CPF"
          class="w-100"
          value={search}
          oninput={(e: HTMLInputElement) => setSearch(e.target.value)}
        ></md-outlined-text-field>

        <md-icon-button onClick={handleSortToggle} title={`Ordenar ${sortOrder === 'asc' ? 'crescente' : 'decrescente'}`}>
          <md-icon>{sortOrder === 'asc' ? 'arrow_downward' : 'arrow_upward'}</md-icon>
        </md-icon-button>
      </div>

      {loading && initialized && <AppLoader />}

      {!loading && contacts.length === 0 && <div className="message-text">Nenhum contato encontrado.</div>}

      <div className="contact-list-wrapper">
        <md-list className="contact-list">
          {contacts.map((c, index) => (
            <div key={c.id}>
              <md-list-item type="button" class="contact-list-item" onclick={() => onSelect(c)}>
                <md-icon slot="start">account_circle</md-icon>
                <span slot="headline">{c.name}</span>
                <span slot="supporting-text">
                  CPF: {c.cpf} • {c.phone}
                </span>
              </md-list-item>
              {index !== contacts.length - 1 && <md-divider />}
            </div>
          ))}
        </md-list>
      </div>

      <md-fab
        tooltip="Adicionar Contato"
        id="add-contact-fab"
        aria-label="Adicionar Contato"
        className="add-contact-fab"
        onClick={() => setIsDialogOpen(true)}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          zIndex: 100
        }}
      >
        <md-icon slot="icon">add</md-icon>
      </md-fab>

      <ModalAddContact open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  )
}
