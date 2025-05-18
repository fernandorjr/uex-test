// @ts-nocheck
import { useEffect, useState } from 'react'
import { validationService } from '@/modules/validation'
import './profile.view.style.css'
import type { IProfileCredentials, TErrorProfileForm } from './profile.view.interface'
import ValidationService from '@/modules/validation/validation.service'
import { useNavigate } from '@/hooks'
import { ERoutes } from '@/tokens/routes'

const ProfileView = () => {
  const { navigate } = useNavigate();
  const [credentials, setCredentials] = useState<IProfileCredentials>({
    firstName: 'Fernando',
    lastName: 'Maionese',
    email: 'fernando@maionese.dev',
    password: '123456',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<TErrorProfileForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [formIsValid, setFormIsValid] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const comparePasswords = (pwd: string, confirm: string): string => (!pwd ? 'Campo obrigatório' : pwd !== confirm ? 'Senhas não conferem' : '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
    handleErrors(name as keyof IProfileCredentials, value)
  }

  const handleErrors = (name: keyof IProfileCredentials, value: string) => {
    let message = ''

    if (name === 'firstName' || name === 'lastName') {
      message = ValidationService.validate('name', value, true) || ''
    }

    if (name === 'email') {
      message = validationService.validate('email', value, true) || ''
    }

    if (name === 'password') {
      message = validationService.validate('password', value, true) || ''
    }

    if (name === 'confirmPassword') {
      message = comparePasswords(credentials.password, value)
    }

    setErrors(prev => ({ ...prev, [name]: message }))
  }

  useEffect(() => {
    if (!isEditing) return
    const hasEmptyRequiredFields = Object.values(credentials).some(v => !v)
    const hasValidationErrors = Object.values(errors).some(Boolean)
    setFormIsValid(!hasEmptyRequiredFields && !hasValidationErrors)
  }, [credentials, errors, isEditing])

  const handleCancel = () => {
    setCredentials({
      firstName: 'Fernando',
      lastName: 'Maionese',
      email: 'fernando@maionese.dev',
      password: '123456',
      confirmPassword: ''
    })
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setIsEditing(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formIsValid) return
    // Aqui você pode enviar os dados atualizados
    alert('Dados salvos com sucesso!')
    setIsEditing(false)
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <h1>Perfil</h1>
          {!isEditing ? (
            <md-filled-button type="button" onClick={() => setIsEditing(true)}>
              <md-icon slot="icon">edit</md-icon>
              Editar
            </md-filled-button>
          ) : (
            <div className="profile-actions">
              <md-text-button onClick={handleCancel}>Cancelar</md-text-button>
              <md-filled-button type="submit" disabled={!formIsValid}>
                <md-icon slot="icon">save</md-icon>
                Salvar
              </md-filled-button>
            </div>
          )}
        </div>

        <form id="profile-form" className="profile-form" onSubmit={handleSubmit} autoComplete="off">
          <md-outlined-text-field
            name="firstName"
            label="Nome"
            value={credentials.firstName}
            disabled={!isEditing}
            onInput={handleChange}
            error={!!errors.firstName}
            error-text={errors.firstName}
            required
            autocomplete="off"
          ></md-outlined-text-field>
          <md-outlined-text-field
            name="lastName"
            label="Sobrenome"
            value={credentials.lastName}
            disabled={!isEditing}
            onInput={handleChange}
            error={!!errors.lastName}
            error-text={errors.lastName}
            required
            autocomplete="off"
          ></md-outlined-text-field>
          <md-outlined-text-field
            name="email"
            label="Email"
            type="email"
            value={credentials.email}
            disabled={!isEditing}
            onInput={handleChange}
            error={!!errors.email}
            error-text={errors.email}
            required
            autocomplete="off"
          ></md-outlined-text-field>
          <md-outlined-text-field
            name="password"
            label="Senha"
            type="password"
            value={credentials.password}
            disabled={!isEditing}
            onInput={handleChange}
            error={!!errors.password}
            error-text={errors.password}
            required
            autocomplete="off"
          ></md-outlined-text-field>
          {isEditing && (
            <md-outlined-text-field
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              value={credentials.confirmPassword}
              onInput={handleChange}
              error={!!errors.confirmPassword}
              error-text={errors.confirmPassword}
              required
              autocomplete="off"
            ></md-outlined-text-field>
          )}
        </form>

        <span className="profile-form-btn-back" onClick={() => navigate(ERoutes.DASHBOARD)}>
          <md-icon slot="leading-icon">arrow_back</md-icon>
          Voltar
        </span>
      </div>
    </div>
  )
}

export default ProfileView
