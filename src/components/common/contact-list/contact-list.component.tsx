// @ts-nocheck
import { useEffect, useMemo, useRef, useState } from 'react'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/list/list.js'
import '@material/web/list/list-item.js'
import './contact-list.style.css'

export type Contact = {
  id: string
  nome: string
  cpf: string
  telefone: string
  endereco: string
  cep: string
  latitude: number
  longitude: number
}

type Props = {
  onSelect: (c: Contact) => void
}

export default function ContactList({ onSelect }: Props) {
  const allContacts: Contact[] = useMemo(() => {
    return [
      {
        id: '1',
        nome: 'Ana Souza',
        cpf: '123.456.789-00',
        telefone: '(11) 91234-5678',
        endereco: 'Rua das Flores, 123',
        cep: '01001-000',
        latitude: -23.55052,
        longitude: -46.633308
      },
      {
        id: '2',
        nome: 'Bruno Lima',
        cpf: '987.654.321-11',
        telefone: '(21) 99876-5432',
        endereco: 'Av. Atlântica, 456',
        cep: '22010-000',
        latitude: -22.971964,
        longitude: -43.182543
      },
      {
        id: '3',
        nome: 'Carla Mendes',
        cpf: '111.222.333-44',
        telefone: '(31) 98765-4321',
        endereco: 'Praça Sete, 789',
        cep: '30111-000',
        latitude: -19.920833,
        longitude: -43.937778
      },
      {
        id: '4',
        nome: 'Daniel Costa',
        cpf: '555.666.777-88',
        telefone: '(41) 91234-5678',
        endereco: 'Rua XV, 101',
        cep: '80020-310',
        latitude: -25.428954,
        longitude: -49.273345
      },
      {
        id: '5',
        nome: 'Eduarda Ramos',
        cpf: '222.333.444-55',
        telefone: '(51) 99876-1234',
        endereco: 'Av. Borges, 202',
        cep: '90010-150',
        latitude: -30.032834,
        longitude: -51.217637
      },
      {
        id: '6',
        nome: 'Felipe Gonçalves',
        cpf: '333.444.555-66',
        telefone: '(61) 91234-0000',
        endereco: 'SCN Quadra 2',
        cep: '70040-020',
        latitude: -15.7801,
        longitude: -47.9292
      },
      {
        id: '7',
        nome: 'Giovana Albuquerque',
        cpf: '444.555.666-77',
        telefone: '(71) 98765-0000',
        endereco: 'Pelourinho',
        cep: '40020-000',
        latitude: -12.9714,
        longitude: -38.5014
      },
      {
        id: '8',
        nome: 'Hugo Fernandes',
        cpf: '777.888.999-00',
        telefone: '(85) 91234-1111',
        endereco: 'Av. Beira Mar, 303',
        cep: '60165-121',
        latitude: -3.7319,
        longitude: -38.5267
      },
      {
        id: '9',
        nome: 'Isabela Torres',
        cpf: '888.999.000-11',
        telefone: '(27) 99876-2222',
        endereco: 'Praia do Canto',
        cep: '29055-100',
        latitude: -20.3155,
        longitude: -40.3128
      },
      {
        id: '10',
        nome: 'João Pedro Silva',
        cpf: '999.000.111-22',
        telefone: '(19) 91234-3333',
        endereco: 'Taquaral, Campinas',
        cep: '13022-500',
        latitude: -22.9056,
        longitude: -47.0608
      },
      {
        id: '11',
        nome: 'Karen Oliveira',
        cpf: '101.202.303-40',
        telefone: '(62) 91234-4444',
        endereco: 'Rua Goiás, 321',
        cep: '74000-000',
        latitude: -16.6869,
        longitude: -49.2648
      },
      {
        id: '12',
        nome: 'Lucas Martins',
        cpf: '202.303.404-50',
        telefone: '(82) 99876-5555',
        endereco: 'Av. Fernandes Lima, 654',
        cep: '57055-000',
        latitude: -9.6498,
        longitude: -35.7089
      },
      {
        id: '13',
        nome: 'Marina Duarte',
        cpf: '303.404.505-60',
        telefone: '(95) 91234-6666',
        endereco: 'Rua das Palmeiras, 987',
        cep: '69301-000',
        latitude: 2.8235,
        longitude: -60.6753
      },
      {
        id: '14',
        nome: 'Nicolas Rocha',
        cpf: '404.505.606-70',
        telefone: '(98) 99876-7777',
        endereco: 'Av. Litorânea, 111',
        cep: '65077-357',
        latitude: -2.5295,
        longitude: -44.3028
      },
      {
        id: '15',
        nome: 'Olívia Farias',
        cpf: '505.606.707-80',
        telefone: '(92) 91234-8888',
        endereco: 'Rua do Comércio, 222',
        cep: '69005-010',
        latitude: -3.1190,
        longitude: -60.0217
      },
      {
        id: '16',
        nome: 'Paulo Henrique',
        cpf: '606.707.808-90',
        telefone: '(47) 99876-9999',
        endereco: 'Av. Brasil, 333',
        cep: '88330-000',
        latitude: -26.9926,
        longitude: -48.6352
      },
      {
        id: '17',
        nome: 'Quésia Barros',
        cpf: '707.808.909-00',
        telefone: '(95) 91234-1010',
        endereco: 'Rua das Acácias, 444',
        cep: '69309-000',
        latitude: 2.8235,
        longitude: -60.6753
      },
      {
        id: '18',
        nome: 'Rafael Teixeira',
        cpf: '808.909.010-11',
        telefone: '(84) 99876-1111',
        endereco: 'Av. Prudente de Morais, 555',
        cep: '59020-400',
        latitude: -5.7945,
        longitude: -35.2110
      },
      {
        id: '19',
        nome: 'Sofia Almeida',
        cpf: '909.010.111-22',
        telefone: '(31) 91234-1212',
        endereco: 'Rua da Bahia, 666',
        cep: '30160-011',
        latitude: -19.9191,
        longitude: -43.9386
      },
      {
        id: '20',
        nome: 'Thiago Pires',
        cpf: '010.111.212-33',
        telefone: '(21) 99876-1313',
        endereco: 'Av. Rio Branco, 777',
        cep: '20090-003',
        latitude: -22.9035,
        longitude: -43.1766
      }
    ]
  }, [])

  const [search, setSearch] = useState('')
  const [contacts, setContacts] = useState<Contact[]>(allContacts)
  const inputRef = useRef(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLInputElement
      setSearch(target.value)
    }

    const inputEl = inputRef.current
    inputEl?.addEventListener('input', handler)

    return () => inputEl?.removeEventListener('input', handler)
  }, [])

  useEffect(() => {
    const filtered = allContacts.filter(c => c.nome.toLowerCase().includes(search.toLowerCase()) || c.cpf.includes(search))
    setContacts(filtered)
  }, [search, allContacts])

  if (allContacts.length === 0) return <div className="message-text">Adicione o seu primeiro contato.</div>

  return (
    <div className="contact-list-container">
      <md-outlined-text-field ref={inputRef} label="Buscar contato" placeholder="Digite nome ou CPF" class="w-100"></md-outlined-text-field>

      <md-list className="contact-list">
        {contacts.map((c, index) => (
          <>
            <md-list-item key={c.id} type="button" class="contact-list-item" onclick={() => onSelect(c)}>
              <md-icon slot="start">account_circle</md-icon>

              <span slot="headline">{c.nome}</span>

              <span slot="supporting-text">
                CPF: {c.cpf} • {c.telefone}
              </span>
            </md-list-item>

            {index !== contacts.length - 1 && <md-divider></md-divider>}
          </>
        ))}

        {contacts.length === 0 && <div className="message-text">Nenhum contato encontrado.</div>}
      </md-list>
    </div>
  )
}
