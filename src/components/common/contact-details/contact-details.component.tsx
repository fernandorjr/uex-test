// @ts-nocheck
import './contact-details.style.css'
import { useEffect, useState } from 'react'
import { validationService } from '@/modules/validation'
import { Map } from '@/components/common'
import type { Contact } from '../contact-list/contact-list.component'
import type { IContactDetailsProps } from './contact-details.interface'

const initialForm = (contact: Contact) => ({
  cpf: contact?.cpf || '',
  telefone: contact?.telefone || '',
  endereco: contact?.endereco || '',
  cep: contact?.cep || ''
})

const initialErrors = {
  cpf: '',
  telefone: '',
  endereco: '',
  cep: ''
}

const ContactDetails = ({ contact }: IContactDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(initialForm(contact))
  const [errors, setErrors] = useState(initialErrors)
  const [formIsValid, setFormIsValid] = useState(false)

  useEffect(() => {
    setIsEditing(false)
    setForm(initialForm(contact))
    setErrors(initialErrors)
  }, [contact])

  const handleErrors = (name: keyof typeof form, value: string) => {
    let message = ''
    if (name === 'cpf') {
      message = validationService.validate('cpf', value, true) || ''
    }
    if (name === 'telefone') {
      message = validationService.validate('phone', value, true) || ''
    }
    if (name === 'cep') {
      message = validationService.validate('zipCode', value, true) || ''
    }
    if (name === 'endereco') {
      message = validationService.validate('size', value, true) || ''
    }
    setErrors(prev => ({ ...prev, [name]: message }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    handleErrors(name as keyof typeof form, value)
  }

  useEffect(() => {
    const hasEmptyRequiredFields = Object.values(form).some(v => !v)
    const hasValidationErrors = Object.values(errors).some(Boolean)
    setFormIsValid(!hasEmptyRequiredFields && !hasValidationErrors)
  }, [form, errors])

  const handleSave = () => {
    if (!formIsValid) return

    setIsEditing(false)
  }

  if (!contact) {
    return (
      <div className="empty-contact-card">
        <md-elevated-card class="no-selection-card">
          <div className="no-selection-content">
            <md-icon>person</md-icon>
            <p>Nenhum contato selecionado</p>
            <span>Escolha alguém da lista ao lado para ver os detalhes</span>
          </div>
        </md-elevated-card>
      </div>
    )
  }

  return (
    <md-elevated-card class="contact-edit-card">
      <div className="contact-edit-header">
        <h2>{contact.nome}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {isEditing && (
            <md-icon-button aria-label="Salvar" onClick={handleSave} disabled={!formIsValid} style={{ marginRight: 4 }}>
              <md-icon>save</md-icon>
            </md-icon-button>
          )}
          <md-icon-button aria-label={isEditing ? 'Fechar' : 'Editar'} onClick={() => setIsEditing(prev => !prev)} toggle selected={isEditing}>
            <md-icon>{isEditing ? 'close' : 'edit'}</md-icon>
          </md-icon-button>
        </div>
      </div>

      <md-divider></md-divider>

      <div className="contact-edit-fields">
        {isEditing ? (
          <>
            <md-outlined-text-field
              name="cpf"
              label="CPF"
              value={form.cpf}
              onInput={handleChange}
              error={!!errors.cpf}
              error-text={errors.cpf}
              required
              autocomplete="off"
            ></md-outlined-text-field>

            <md-outlined-text-field
              name="telefone"
              label="Telefone"
              value={form.telefone}
              onInput={handleChange}
              error={!!errors.telefone}
              error-text={errors.telefone}
              required
              autocomplete="off"
            ></md-outlined-text-field>

            <md-outlined-text-field
              name="endereco"
              label="Endereço"
              value={form.endereco}
              onInput={handleChange}
              error={!!errors.endereco}
              error-text={errors.endereco}
              required
              autocomplete="off"
            ></md-outlined-text-field>

            <md-outlined-text-field
              name="cep"
              label="CEP"
              value={form.cep}
              onInput={handleChange}
              error={!!errors.cep}
              error-text={errors.cep}
              required
              autocomplete="off"
            ></md-outlined-text-field>
          </>
        ) : (
          <>
            <div className="info-block">
              <label>CPF</label>
              <span>{form.cpf}</span>
            </div>
            <div className="info-block">
              <label>Telefone</label>
              <span>{form.telefone}</span>
            </div>
            <div className="info-block">
              <label>Endereço</label>
              <span>{form.endereco}</span>
            </div>
            <div className="info-block">
              <label>CEP</label>
              <span>{form.cep}</span>
            </div>
          </>
        )}
      </div>

      <div className="map-section">
        <h3>Localização</h3>
        <Map lat={contact.latitude} lng={contact.longitude} />
      </div>
    </md-elevated-card>
  )
}

export default ContactDetails
