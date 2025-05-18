//  @ts-nocheck
import { useEffect, useRef, useState, type FC } from 'react'
import type { IModalAddContactProps } from './modal-add-contact.interface'
import { validationService } from '@/modules/validation'

type FormState = {
  nome: string
  cpf: string
  telefone: string
  endereco: string
  cep: string
}

type FormErrors = {
  [K in keyof FormState]: string
}

const initialForm: FormState = {
  nome: '',
  cpf: '',
  telefone: '',
  endereco: '',
  cep: ''
}

const initialErrors: FormErrors = {
  nome: '',
  cpf: '',
  telefone: '',
  endereco: '',
  cep: ''
}

const AddContactDialog: FC<IModalAddContactProps> = ({ open, onClose, onSave }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>(initialErrors)
  const [formIsValid, setFormIsValid] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(initialForm)
      setErrors(initialErrors)
      setFormIsValid(false)
    }
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    handleErrors(name as keyof FormState, value)
  }

  const handleErrors = (name: keyof FormState, value: string) => {
    let message = ''
    if (name === 'nome') {
      message = validationService.validate('name', value, true) || ''
    }
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

  useEffect(() => {
    const hasEmptyRequiredFields = Object.values(form).some(v => !v)
    const hasValidationErrors = Object.values(errors).some(Boolean)
    setFormIsValid(!hasEmptyRequiredFields && !hasValidationErrors)
  }, [form, errors])

  const save = () => {
    if (!formIsValid) return
    const newContact = {
      ...form,
      id: Date.now().toString(),
      latitude: -23.5505,
      longitude: -46.6333
    }
    onSave(newContact)
    onClose()
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleDialogClose = () => {
      onClose()
    }

    dialog.addEventListener('close', handleDialogClose)

    return () => {
      dialog.removeEventListener('close', handleDialogClose)
    }
  }, [onClose])

  return (
    <md-dialog ref={dialogRef} open={open} onClose={onClose}>
      <div slot="headline">Novo Contato</div>
      <div slot="content">
        <md-outlined-text-field
          name="nome"
          label="Nome"
          value={form.nome}
          onInput={handleChange}
          error={!!errors.nome}
          error-text={errors.nome}
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
      </div>
      <div slot="actions">
        <md-text-button onClick={onClose}>Cancelar</md-text-button>
        <md-filled-button onClick={save} disabled={!formIsValid}>Salvar</md-filled-button>
      </div>
    </md-dialog>
  )
}

export default AddContactDialog
