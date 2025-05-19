// @ts-nocheck
import { useEffect, useState } from 'react'

import { useNavigate } from '@/hooks'
import { ERoutes } from '@/tokens/routes'
import { validationService } from '@/modules/validation'

import { AuthFormCard } from '@/components/common'

import './register.view.style.css'
import type { IUserRegisterPayload, TErrorRegisterForm } from './register.view.interface'
import { userService } from '@/modules/user'
import useNotify from '@/hooks/notify/notify.hook'
import { ENotifyType } from '@/hooks/notify/notify.interface'

const RegisterView = () => {
  const { navigate } = useNavigate()
  const notify = useNotify()

  const [userData, setUserData] = useState<IUserRegisterPayload>({
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
  const [loading, setLoading] = useState(false)

  const comparePasswords = (pwd: string, confirm: string): string => (!pwd ? 'Campo obrigatório' : pwd !== confirm ? 'Senhas não conferem' : '')

  const handleNavigateToLogin = () => {
    if (loading) return

    navigate(ERoutes.LOGIN)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
    handleErrors(name as keyof IUserRegisterPayload, value)
  }

  const handleErrors = (name: keyof IUserRegisterPayload, value: string) => {
    let message = ''

    if (name === 'firstName' || name === 'lastName') {
      message = validationService.validate('name', value, true) || ''
    }

    if (name === 'email') {
      message = validationService.validate('email', value, true) || ''
    }

    if (name === 'password') {
      message = validationService.validate('password', value, true) || ''
    }

    if (name === 'confirmPassword') {
      message = comparePasswords(userData.password, value)
    }

    setErrors(prev => ({ ...prev, [name]: message }))
  }

  useEffect(() => {
    const hasEmptyRequiredFields = Object.values(userData).some(v => !v)
    const hasValidationErrors = Object.values(errors).some(Boolean)
    setFormIsValid(!hasEmptyRequiredFields && !hasValidationErrors)
  }, [userData, errors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formIsValid) return

    try {
      setLoading(true)
      await userService.register(userData)
      notify(ENotifyType.SUCCESS, 'Cadastro realizado com sucesso!')
      navigate(ERoutes.LOGIN)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message) notify(ENotifyType.ERROR, error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthFormCard title="Cadastro">
      <form className="w-100" onSubmit={handleSubmit}>
        <div className="register-form-inputs-wrapper">
          <md-outlined-text-field
            name="email"
            label="Email"
            value={userData.email}
            onInput={handleChange}
            error={!!errors.email}
            error-text={errors.email}
            disabled={loading}
            required
            autocomplete="off"
          >
            <md-icon slot="leading-icon">mail</md-icon>
          </md-outlined-text-field>

          <div className="register-form-double-inputs-wrapper">
            <md-outlined-text-field
              name="firstName"
              label="Nome"
              value={userData.firstName}
              onInput={handleChange}
              error={!!errors.firstName}
              error-text={errors.firstName}
              disabled={loading}
              required
              autocomplete="off"
            >
              <md-icon slot="leading-icon">person</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
              name="lastName"
              label="Sobrenome"
              value={userData.lastName}
              onInput={handleChange}
              error={!!errors.lastName}
              error-text={errors.lastName}
              disabled={loading}
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
              value={userData.password}
              onInput={handleChange}
              error={!!errors.password}
              error-text={errors.password}
              disabled={loading}
              required
              autocomplete="off"
            >
              <md-icon slot="leading-icon">lock</md-icon>
            </md-outlined-text-field>
            <md-outlined-text-field
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              value={userData.confirmPassword}
              onInput={handleChange}
              error={!!errors.confirmPassword}
              error-text={errors.confirmPassword}
              disabled={loading}
              required
              autocomplete="off"
            >
              <md-icon slot="leading-icon">lock_reset</md-icon>
            </md-outlined-text-field>
          </div>
        </div>

        <div className="register-form-btn-login">
          <md-filled-button type="submit" disabled={!formIsValid || loading}>
            {loading ? <md-icon>sync</md-icon> : 'Cadastrar'}
          </md-filled-button>

          <span className="register-form-btn-back" onClick={handleNavigateToLogin}>
            <md-icon slot="leading-icon">arrow_back</md-icon>
            Voltar
          </span>
        </div>
      </form>
    </AuthFormCard>
  )
}

export default RegisterView
