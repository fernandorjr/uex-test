// @ts-nocheck
import { useEffect, useState } from 'react'
import type { IRegisterCredentials, TErrorRegisterForm } from './register.page.interface'
import { validationService } from '@/modules/validation'
import './register.page.style.css'
import { useNavigate } from '@/hooks'
import { ERoutes } from '@/tokens/routes'

const RegisterView = () => {
  const { navigate } = useNavigate()
  const [credentials, setCredentials] = useState<IRegisterCredentials>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<TErrorRegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [formIsValid, setFormIsValid] = useState(false)

  const comparePasswords = (pwd: string, confirm: string): string => (!pwd ? 'Campo obrigatório' : pwd !== confirm ? 'Senhas não conferem' : '')

  const handleNavigateToLogin = () => {
    navigate(ERoutes.LOGIN)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
    handleErrors(name as keyof IRegisterCredentials, value)
  }

  const handleErrors = (name: keyof IRegisterCredentials, value: string) => {
    let message = ''

    if (name === 'firstName' || name === 'lastName') {
      message = validationService.validate('name', value, true) || ''
    }

    if (name === 'email') {
      // usa o serviço de validação existente
      message = validationService.validate('email', value, true) || ''
    }

    if (name === 'password') {
      message = validationService.validate('password', value, true) || ''
    }

    if (name === 'confirmPassword') {
      // compara com a senha atual
      message = comparePasswords(credentials.password, value)
    }

    setErrors(prev => ({ ...prev, [name]: message }))
  }

  useEffect(() => {
    const hasEmptyRequiredFields = Object.values(credentials).some(v => !v)
    const hasValidationErrors = Object.values(errors).some(Boolean)
    setFormIsValid(!hasEmptyRequiredFields && !hasValidationErrors)
  }, [credentials, errors])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formIsValid) return
    console.log('submit', credentials)
  }

  return (
    <div className="register-card">
      <form className="w-100" onSubmit={handleSubmit}>
        <div className='register-form-title-wrapper'>
          <md-icon className="register-form-title-icon" slot="leading-icon">checkbook</md-icon>
          <span className="register-form-title">Cadastro</span>
        </div>

        <div className="register-form-inputs-wrapper">
          <md-outlined-text-field
            name="email"
            label="Email"
            value={credentials.email}
            onInput={handleChange}
            error={!!errors.email}
            error-text={errors.email}
            required
            autocomplete="off"
          >
            <md-icon slot="leading-icon">mail</md-icon>
          </md-outlined-text-field>

          <div className="register-form-double-inputs-wrapper">
            <md-outlined-text-field
              name="firstName"
              label="Nome"
              value={credentials.firstName}
              onInput={handleChange}
              error={!!errors.firstName}
              error-text={errors.firstName}
              required
              autocomplete="off"
            >
              <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
              name="lastName"
              label="Sobrenome"
              value={credentials.lastName}
              onInput={handleChange}
              error={!!errors.lastName}
              error-text={errors.lastName}
              required
              autocomplete="off"
            >
              <md-icon slot="leading-icon">account_circle</md-icon>
            </md-outlined-text-field>
          </div>

          <div className="register-form-double-inputs-wrapper">
            <md-outlined-text-field
              name="password"
              label="Senha"
              type="password"
              value={credentials.password}
              onInput={handleChange}
              error={!!errors.password}
              error-text={errors.password}
              required
              autocomplete="off"
            >
              <md-icon slot="leading-icon">lock</md-icon>
            </md-outlined-text-field>
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
            >
              <md-icon slot="leading-icon">lock_reset</md-icon>
            </md-outlined-text-field>
          </div>
        </div>

        <div className="register-form-btn-login">
          <md-filled-button type="submit" disabled={!formIsValid}>
            Cadastrar
          </md-filled-button>

          <span className="register-form-btn-back" onClick={handleNavigateToLogin}>
            <md-icon slot="leading-icon">arrow_back</md-icon>
            Voltar
          </span>
        </div>
      </form>
    </div>
  )
}

export default RegisterView
