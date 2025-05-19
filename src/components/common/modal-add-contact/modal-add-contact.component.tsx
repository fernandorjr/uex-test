// @ts-nocheck
import { useEffect, useRef, useState, type FC } from 'react'
import type { IContactForm, IModalAddContactProps, TErrorContactForm } from './modal-add-contact.interface'
import { validationService } from '@/modules/validation'
import { contactService } from '@/modules/contact'
import useNotify from '@/hooks/notify/notify.hook'
import { ENotifyType } from '@/hooks/notify/notify.interface'
import { viaCepService } from '@/modules/via-cep'
import './modal-add-contact.style.css'

const AddContactDialog: FC<IModalAddContactProps> = ({ open, onClose, userId }) => {
  const notify = useNotify()
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const [formIsValid, setFormIsValid] = useState<boolean>(false)
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
  
  const handleClose = () => {
    if(loading) return

    onClose();
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

  const handleResetForm = () => {
    setForm({
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
    setZipCodeConsulted('')
    setFormIsValid(false)
    setLoading(false)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    try {
      setLoading(true)
      await contactService.register({
        ...form,
        userId
      })
      setLoading(false)
      handleClose()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)

      if (error.message) notify(ENotifyType.ERROR, error.message)
    }
  }

  useEffect(() => {
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
  }, [form, errors])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleDialogClose = () => {
      onClose()
    }

    dialog.addEventListener('close', handleDialogClose)

    handleResetForm()
    return () => {
      dialog.removeEventListener('close', handleDialogClose)
    }
  }, [onClose])

  useEffect(() => {
    const zipCodeError = validationService.validate('zipCode', form.zipCode)
    const zipCodeAlreadyConsulted = zipCodeConsulted === form.zipCode
    if (zipCodeError || zipCodeAlreadyConsulted) return
    handleGetAddress()
  }, [form, zipCodeConsulted])

  return (
    <md-dialog ref={dialogRef} open={open} onClose={loading ? undefined : handleClose}>
      <div slot="headline">Novo Contato</div>
      <div slot="subtitle">Info</div>
      <div slot="content">
        <md-outlined-text-field
          name="name"
          label="Nome"
          value={form.name}
          onInput={handleChange}
          error={!!errors.name}
          error-text={errors.name}
          disabled={loading}
          supporting-text="Nome completo"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <div className="contact-form-double-inputs-wrapper">
          <md-outlined-text-field
            name="cpf"
            label="CPF"
            value={form.cpf}
            onInput={handleChange}
            error={!!errors.cpf}
            error-text={errors.cpf}
            disabled={loading}
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
            supporting-text="Apenas números"
            required
            autocomplete="off"
          ></md-outlined-text-field>
        </div>

        <div className="contact-form-double-inputs-wrapper">
          <md-outlined-text-field
            name="zipCode"
            label="CEP"
            value={form.zipCode}
            onInput={handleChange}
            error={!!errors.zipCode}
            error-text={errors.zipCode}
            disabled={loading}
            supporting-text="Apenas números"
            required
            autocomplete="off"
          ></md-outlined-text-field>

          <div className="contact-form-cep-info-wrapper">
            <md-icon>info</md-icon>
            <span className="contact-form-cep-info">O CEP é necessário para preencher automaticamente o endereço.</span>
          </div>
        </div>

        <md-outlined-text-field
          name="street"
          label="Rua"
          value={form.street}
          onInput={handleChange}
          error={!!errors.street}
          error-text={errors.street}
          disabled={loading}
          supporting-text="Nome da rua"
          required
          autocomplete="off"
        ></md-outlined-text-field>

        <div className="contact-form-double-inputs-wrapper">
          <md-outlined-text-field
            name="number"
            label="Número"
            value={form.number}
            onInput={handleChange}
            error={!!errors.number}
            error-text={errors.number}
            disabled={loading}
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
            supporting-text="Complemento do endereço"
            autocomplete="off"
          ></md-outlined-text-field>
        </div>

        <div className="contact-form-double-inputs-wrapper">
          <md-outlined-text-field
            name="neighborhood"
            label="Bairro"
            value={form.neighborhood}
            onInput={handleChange}
            error={!!errors.neighborhood}
            error-text={errors.neighborhood}
            disabled={loading}
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
            supporting-text="Nome da cidade"
            required
            autocomplete="off"
          ></md-outlined-text-field>
        </div>

        <md-outlined-text-field
          name="state"
          label="Estado"
          value={form.state}
          onInput={handleChange}
          error={!!errors.state}
          error-text={errors.state}
          disabled={loading}
          supporting-text="Nome do estado"
          required
          autocomplete="off"
        ></md-outlined-text-field>
      </div>

      <div slot="actions">
        <md-text-button onClick={handleClose} disabled={loading}>Cancelar</md-text-button>
        <md-filled-button onClick={handleSubmit} disabled={!formIsValid || loading}>
          {loading ? <md-icon className="load-icon">sync</md-icon> : 'Salvar'}
        </md-filled-button>
      </div>
    </md-dialog>
  )
}

export default AddContactDialog
