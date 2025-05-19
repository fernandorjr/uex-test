// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import './contact-list.style.css'
import { AppLoader, ModalAddContact } from '@/components/common'
import type { IContactListProps } from './contact-list.interface'
import { ENotifyType } from '@/hooks/notify/notify.interface'
import useNotify from '@/hooks/notify/notify.hook'
import type { IContact } from '@/modules/contact/contact.interface'
import { contactService } from '@/modules/contact'

export default function ContactList({ onSelect, userId }: IContactListProps) {
  const notify = useNotify()
  const inputRef = useRef(null)
  
  const [contacts, setContacts] = useState<IContact[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.cpf.includes(search))

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)
        const data = await contactService.getAllContacts({ userId })
        console.log(data);
        setContacts(data)
        setError(null)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError('Erro ao carregar contatos')

        if (error.message) notify(ENotifyType.ERROR, error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [userId])

  return (
    <div className="contact-list-container">
      <md-outlined-text-field
        ref={inputRef}
        label="Buscar contato"
        placeholder="Digite nome ou CPF"
        class="w-100"
        value={search}
        oninput={(e: HTMLInputElement) => setSearch(e.target.value)}
      ></md-outlined-text-field>

      {loading && <AppLoader />}

      {error && <div className="message-text">{error}</div>}

      {!loading && filteredContacts.length === 0 && <div className="message-text">Nenhum contato encontrado.</div>}

      <div className="contact-list-wrapper">
        <md-list className="contact-list">
          {filteredContacts.map((c, index) => (
            <div key={c.id}>
              <md-list-item type="button" class="contact-list-item" onclick={() => onSelect(c)}>
                <md-icon slot="start">account_circle</md-icon>
                <span slot="headline">{c.name}</span>
                <span slot="supporting-text">
                  CPF: {c.cpf} • {c.phone}
                </span>
              </md-list-item>
              {index !== filteredContacts.length - 1 && <md-divider />}
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

      <ModalAddContact open={isDialogOpen} onClose={() => setIsDialogOpen(false)} userId={userId} />
    </div>
  )
}
