// @ts-nocheck
import { useEffect, useState } from 'react'

import { useNavigate } from '@/hooks'
import { ERoutes } from '@/tokens/routes'
import { validationService } from '@/modules/validation'

import { AuthFormCard } from '@/components/common'

import './login.view.style.css'
import { ICredentials } from './login.view.interface'

const LoginView = () => {
  const { navigate } = useNavigate()

  const [credentials, setCredentials] = useState<ICredentials>({ email: '', password: '' })
  const [errors, setErrors] = useState<TErrorCredentialsForm>({ email: '', password: '' })
  const [formIsValid, setFormIsValid] = useState<boolean>(false)

  const handleNavigate = (route: ERoutes) => {
    navigate(route)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCredentials(prev => ({ ...prev, [name]: value }))
    handleErrors(name as keyof ICredentials, value)
  }

  const handleErrors = (name: keyof ICredentials, value: string) => {
    if (name === 'email') {
      const message = validationService.validate('email', value, true)
      setErrors(prev => ({ ...prev, [name]: message || '' }))
    }

    if (name === 'password') {
      const validationPassword = !value.length ? 'Campo obrigatório' : '' ;
      setErrors(prev => ({ ...prev, [name]: validationPassword }))
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formIsValid) return

    console.log('submit', credentials)
  }

  useEffect(() => {
    const hasEmptyRequiredFields = !credentials.email || !credentials.password
    const hasValidationErrors = Object.values(errors).some(Boolean)

    setFormIsValid(!hasEmptyRequiredFields && !hasValidationErrors)
  }, [credentials, errors])

  return (
    <AuthFormCard title="Bem Vindo" subtitle="Dragon's Contacts">
      <form className="w-100" onSubmit={handleSubmit}>
        <div className="login-form-inputs-wrapper">
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
            <md-icon slot="leading-icon">person</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field
            name="password"
            label="Senha"
            type="password"
            error={!!errors.password}
            error-text={errors.password}
            value={credentials.password}
            onInput={handleChange}
            required
            autocomplete="off"
          >
            <md-icon slot="leading-icon">lock</md-icon>
          </md-outlined-text-field>
        </div>

        <div className="w-100">
          <md-filled-button className="w-100" type="submit" disabled={!formIsValid}>
            Entrar
          </md-filled-button>
        </div>

        <div className="login-form-btn-group">
          <span onClick={() => handleNavigate(ERoutes.RECOVERY_PASSWORD)}>Esqueci minha senha</span>
          <span onClick={() => handleNavigate(ERoutes.REGISTER)}>Registrar</span>
        </div>
      </form>
    </AuthFormCard>
  )
}

export default LoginView
