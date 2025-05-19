// @ts-nocheck
import { Map } from '@/components/common'
import useContacts from '@/hooks/contacts/contacts.hook'
import useNotify from '@/hooks/notify/notify.hook'
import { ENotifyType } from '@/hooks/notify/notify.interface'
import { contactService } from '@/modules/contact'
import type { CreateContactDto } from '@/modules/contact/contact.dtos'
import { validationService } from '@/modules/validation'
import { viaCepService } from '@/modules/via-cep'
import { useEffect, useState } from 'react'
import type { IContactDetailsProps, IContactForm, TErrorContactForm } from './contact-details.interface'
import './contact-details.style.css'

const ContactDetails = ({ contact, userId }: IContactDetailsProps) => {
  const notify = useNotify()
  const { fetchContacts } = useContacts()

  const [isEditing, setIsEditing] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)
  const [zipCodeConsulted, setZipCodeConsulted] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<IContactForm>({
    name: '',
    cpf: '',
    phone: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  })
  const [errors, setErrors] = useState<TErrorContactForm>({
    name: '',
    cpf: '',
    phone: '',
    zipCode: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: ''
  })

  useEffect(() => {
    if (!contact) return

    setIsEditing(false)
    setForm(contact)
  }, [contact])

  const handleToggleEdit = () => {
    setFormIsValid(false)
    setErrors({
      name: '',
      cpf: '',
      phone: '',
      zipCode: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: ''
    })

    if (isEditing) {
      setForm(contact)
      setZipCodeConsulted('')
    }

    setIsEditing(prev => !prev)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    handleErrors(name as keyof IContactForm, value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleErrors = (name: keyof IContactForm, value: any) => {
    const validateBySize: (keyof IContactForm)[] = ['city', 'state', 'neighborhood', 'street', 'zipCode', 'phone']

    if (name === 'zipCode') {
      const message = validationService.validate('zipCode', value)
      setErrors(prev => ({ ...prev, [name]: message || '' }))
    }

    if (name === 'cpf') {
      const message = validationService.validate('cpf', value)
      setErrors(prev => ({ ...prev, [name]: message || '' }))
    }

    if (name === 'phone') {
      const message = validationService.validate('phone', value)
      setErrors(prev => ({ ...prev, [name]: message || '' }))
    }

    if (name === 'name') {
      const message = validationService.validate('name', value)
      setErrors(prev => ({ ...prev, [name]: message || '' }))
    }

    if (validateBySize.includes(name)) {
      const message = validationService.validate('size', value)
      setErrors(prev => ({ ...prev, [name]: message || '' }))
    }
  }

  const handleGetAddress = async () => {
    try {
      const address = await viaCepService.get(form.zipCode)

      setForm(prev => ({
        ...prev,
        ...address
      }))

      setZipCodeConsulted(form.zipCode)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message) notify(ENotifyType.ERROR, error.message)
    }
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    try {
      setLoading(true)
      await contactService.updateContact(userId, contact.id, form as CreateContactDto)
      await fetchContacts(userId)
      setLoading(false)
      setIsEditing(false)

      notify(ENotifyType.SUCCESS, 'Contato atualizado com sucesso!')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)

      if (error.message) notify(ENotifyType.ERROR, error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isEditing) {
      setFormIsValid(true)
      return
    }

    const errorsFields = Object.keys(errors)
    const validateBySize: (keyof IContactForm)[] = ['city', 'state', 'neighborhood', 'street', 'zipCode', 'phone']

    const hasErrors = errorsFields.some(key => {
      if (key === 'name') {
        return validationService.validate('name', form.name)
      }

      if (key === 'cpf') {
        return validationService.validate('cpf', form.cpf)
      }

      if (key === 'phone') {
        return validationService.validate('phone', form.phone)
      }

      if (key === 'zipCode') {
        return validationService.validate('zipCode', form.zipCode)
      }

      if (key === 'number') {
        return !form.number.length
      }

      if (validateBySize.includes(key as keyof typeof form)) {
        return validationService.validate('size', form[key as keyof typeof form])
      }

      return false
    })

    setFormIsValid(!hasErrors)
  }, [form, errors, isEditing])

  useEffect(() => {
    if (!isEditing) return

    const zipCodeError = validationService.validate('zipCode', form.zipCode)
    const zipCodeAlreadyConsulted = zipCodeConsulted === form.zipCode
    if (zipCodeError || zipCodeAlreadyConsulted) return
    handleGetAddress()
  }, [form, zipCodeConsulted, isEditing])

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
        <h2>{contact.name}</h2>
        <div>
          {isEditing && (
            <md-icon-button aria-label="Salvar" onClick={handleSubmit} disabled={!formIsValid || loading} style={{ marginRight: 4 }}>
              <md-icon>{loading ? 'sync' : 'save'}</md-icon>
            </md-icon-button>
          )}
          <md-icon-button aria-label={isEditing ? 'Fechar' : 'Editar'} onClick={handleToggleEdit} disabled={loading}>
            <md-icon>{isEditing ? 'close' : 'edit'}</md-icon>
          </md-icon-button>
        </div>
      </div>

      <md-divider></md-divider>

      <div className="contact-edit-fields">
        <md-outlined-text-field
          name="name"
          label="Nome"
          value={form.name}
          onInput={handleChange}
          error={!!errors.name}
          error-text={errors.name}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Nome completo"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="cpf"
          label="CPF"
          value={form.cpf}
          onInput={handleChange}
          error={!!errors.cpf}
          error-text={errors.cpf}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Apenas números"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="phone"
          label="Celular"
          value={form.phone}
          onInput={handleChange}
          error={!!errors.phone}
          error-text={errors.phone}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Apenas números"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="zipCode"
          label="CEP"
          value={form.zipCode}
          onInput={handleChange}
          error={!!errors.zipCode}
          error-text={errors.zipCode}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Apenas números"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="street"
          label="Rua"
          value={form.street}
          onInput={handleChange}
          error={!!errors.street}
          error-text={errors.street}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Nome da rua"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="number"
          label="Número"
          value={form.number}
          onInput={handleChange}
          error={!!errors.number}
          error-text={errors.number}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Número do endereço"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="complement"
          label="Complemento"
          value={form.complement}
          onInput={handleChange}
          error={!!errors.complement}
          error-text={errors.complement}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Complemento do endereço"
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="neighborhood"
          label="Bairro"
          value={form.neighborhood}
          onInput={handleChange}
          error={!!errors.neighborhood}
          error-text={errors.neighborhood}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Nome do bairro"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="city"
          label="Cidade"
          value={form.city}
          onInput={handleChange}
          error={!!errors.city}
          error-text={errors.city}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Nome da cidade"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <md-outlined-text-field
          name="state"
          label="Estado"
          value={form.state}
          onInput={handleChange}
          error={!!errors.state}
          error-text={errors.state}
          disabled={loading}
          readonly={!isEditing}
          supporting-text="Nome do estado"
          required
          autocomplete="off"
        ></md-outlined-text-field>
      </div>

      <div className="map-section">
        <h3>Localização</h3>
        <Map lat={contact.lat} lng={contact.lng} />
      </div>
    </md-elevated-card>
  )
}

export default ContactDetails
