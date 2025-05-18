// @ts-nocheck
import { useEffect, useState } from 'react'

import { useNavigate } from '@/hooks'
import { ERoutes } from '@/tokens/routes'
import { validationService } from '@/modules/validation'

import { AuthFormCard } from '@/components/common'

import './recovery-password.view.style.css'
import type { IRecoveryPasswordCredentials, TErrorRecoveryPasswordForm } from './recovery-password.view.interface'
import useNotify from '@/hooks/notify/notify.hook'
import { userService } from '@/modules/user'
import { ENotifyType } from '@/hooks/notify/notify.interface'

const RecoveryPasswordView = () => {
  const { navigate } = useNavigate()
  const notify = useNotify()

  const [credentials, setCredentials] = useState<IRecoveryPasswordCredentials>({
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [errors, setErrors] = useState<TErrorRecoveryPasswordForm>({
    email: '',
    newPassword: '',
    confirmNewPassword: ''
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
    setCredentials(prev => ({ ...prev, [name]: value }))
    handleErrors(name as keyof IRecoveryPasswordCredentials, value)
  }

  const handleErrors = (name: keyof IRecoveryPasswordCredentials, value: string) => {
    let message = ''

    if (name === 'email') {
      message = validationService.validate('email', value, true) || ''
    }

    if (name === 'newPassword') {
      message = validationService.validate('password', value, true) || ''
    }

    if (name === 'confirmNewPassword') {
      message = comparePasswords(credentials.newPassword, value)
    }

    setErrors(prev => ({ ...prev, [name]: message }))
  }

  useEffect(() => {
    const hasEmptyRequiredFields = Object.values(credentials).some(v => !v)
    const hasValidationErrors = Object.values(errors).some(Boolean)
    setFormIsValid(!hasEmptyRequiredFields && !hasValidationErrors)
  }, [credentials, errors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formIsValid) return

    setLoading(true)

    try {
      await userService.recoverPassword(credentials)

      notify(ENotifyType.SUCCESS,'Senha alterada com sucesso!')

      navigate(ERoutes.LOGIN)
    } catch (error: TServiceError) {
      notify(ENotifyType.ERROR, error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthFormCard title="Recuperar Senha">
      <form className="w-100" onSubmit={handleSubmit}>
        <div className="recovery-password-form-inputs-wrapper">
          <md-outlined-text-field
            name="email"
            label="Email"
            value={credentials.email}
            onInput={handleChange}
            error={!!errors.email}
            error-text={errors.email}
            disabled={loading}
            required
            autocomplete="off"
          >
            <md-icon slot="leading-icon">mail</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field
            name="newPassword"
            label="Nova Senha"
            type="password"
            value={credentials.newPassword}
            onInput={handleChange}
            error={!!errors.newPassword}
            error-text={errors.newPassword}
            disabled={loading}
            required
            autocomplete="off"
          >
            <md-icon slot="leading-icon">lock</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field
            name="confirmNewPassword"
            label="Confirmar Nova Senha"
            type="password"
            value={credentials.confirmNewPassword}
            onInput={handleChange}
            error={!!errors.confirmNewPassword}
            error-text={errors.confirmNewPassword}
            disabled={loading}
            required
            autocomplete="off"
          >
            <md-icon slot="leading-icon">lock_reset</md-icon>
          </md-outlined-text-field>
        </div>

        <div className="recovery-password-form-btn-login w-100">
          <md-filled-button type="submit" disabled={!formIsValid || loading}>
            {loading ? <md-icon>sync</md-icon> : 'Recuperar Senha'}
          </md-filled-button>

          <span className="recovery-password-form-btn-back" onClick={handleNavigateToLogin}>
            <md-icon slot="leading-icon">arrow_back</md-icon>
            Voltar
          </span>
        </div>
      </form>
    </AuthFormCard>
  )
}

export default RecoveryPasswordView
