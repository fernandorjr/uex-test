// @ts-nocheck
import { useState, useEffect, useRef } from 'react'
import './profile.view.style.css'
import type { IProfileForm, TErrorProfileForm } from './profile.view.interface'
import { useAuth, useNavigate, useStorage } from '@/hooks'
import { ERoutes } from '@/tokens/routes'
import { validationService } from '@/modules/validation'
import { userService } from '@/modules/user'
import { EAuthTokens } from '@/tokens/auth'
import useNotify from '@/hooks/notify/notify.hook'
import { ENotifyType } from '@/hooks/notify/notify.interface'

export default function ProfileView() {
  const { user, setUser } = useAuth()
  const { delStorage } = useStorage()
  const { navigate } = useNavigate()
  const notify = useNotify();

  const [form, setForm] = useState<IProfileForm>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  })
  const [errors, setErrors] = useState<TErrorProfileForm>({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [formIsValid, setFormIsValid] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const [delPassword, setDelPassword] = useState('')
  const [delError, setDelError] = useState('')

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    handleErrors(name, value)
  }

  const handleErrors = (name: keyof IProfileForm, value: string) => {
    let msg = ''
    if (name === 'firstName' || name === 'lastName') {
      msg = validationService.validate('name', value, true) || ''
    }
    if (name === 'email') {
      msg = validationService.validate('email', value, true) || ''
    }
    setErrors(prev => ({ ...prev, [name]: msg }))
  }

  useEffect(() => {
    if (!isEditing) return
    const hasEmpty = Object.values(form).some(v => !v)
    const hasErr = Object.values(errors).some(Boolean)
    setFormIsValid(!hasEmpty && !hasErr)
  }, [form, errors, isEditing])

  const handleCancel = () => {
    setForm({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    })
    setErrors({ firstName: '', lastName: '', email: '' })
    setFormIsValid(false)
    setIsEditing(false)
  }

  const handleSubmit = async () => {
    if (!formIsValid) return
    try {
      setIsLoading(true)
      const updatedUser = await userService.updateProfile(user.id, form)
      setUser(updatedUser)
      notify(ENotifyType.SUCCESS, 'Perfil atualizado com sucesso')
      setIsEditing(false)
    } catch (err: any) {
      notify(ENotifyType.ERROR, err.message || 'Erro ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  // Delete account logic
  const openDeleteDialog = () => dialogRef.current?.show()
  const closeDeleteDialog = () => {
    dialogRef.current?.close()
    setDelPassword('')
    setDelError('')
  }

  const deleteAccount = async () => {
    try {
      setIsLoading(true)
      await userService.deleteProfile(user.id)
      delStorage(EAuthTokens.TOKEN)
      setUser(null)

      navigate(ERoutes.LOGIN)
    } catch (err: any) {
      setDelError(err.message || 'Erro ao excluir conta')
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = async () => {
    try {
      setIsLoading(true)
      await userService.validatePassword(user.id, delPassword)
      await deleteAccount()
      setForm({
        password: ''
      })
      setError('')
      navigate(ERoutes.LOGIN)
    } catch (err: any) {
      setDelError(err.message || 'Senha incorreta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <h1>Perfil</h1>
          {!isEditing ? (
            <md-filled-button type="button" onClick={() => setIsEditing(true)} disabled={isLoading || isEditing}>
              <md-icon slot="icon">edit</md-icon> Editar
            </md-filled-button>
          ) : (
            <div className="profile-actions">
              <md-text-button onClick={handleCancel} disabled={isLoading}>Cancelar</md-text-button>
              <md-filled-button onClick={handleSubmit} disabled={!formIsValid || isLoading}>
                <md-icon slot="icon">{ isLoading ? "sync" : "save" }</md-icon> Salvar
              </md-filled-button>
            </div>
          )}
        </div>

        <form id="profile-form" className="profile-form" autoComplete="off">
          <md-outlined-text-field
            name="firstName"
            label="Nome"
            value={form.firstName}
            disabled={!isEditing || isLoading}
            onInput={handleChange}
            error={!!errors.firstName}
            error-text={errors.firstName}
            required
          ></md-outlined-text-field>

          <md-outlined-text-field
            name="lastName"
            label="Sobrenome"
            value={form.lastName}
            disabled={!isEditing || isLoading}
            onInput={handleChange}
            error={!!errors.lastName}
            error-text={errors.lastName}
            required
          ></md-outlined-text-field>

          <md-outlined-text-field
            name="email"
            label="Email"
            type="email"
            value={form.email}
            disabled={!isEditing || isLoading}
            onInput={handleChange}
            error={!!errors.email}
            error-text={errors.email}
            required
          ></md-outlined-text-field>
        </form>

        <div className="profile-footer">
          <span className="profile-form-btn-back" onClick={ isLoading ? undefined : () => navigate(ERoutes.DASHBOARD)}>
            <md-icon slot="leading-icon">arrow_back</md-icon> Voltar
          </span>

          <md-filled-button class="delete-account-btn" onClick={openDeleteDialog} disabled={isLoading || isEditing}>
            Excluir Conta
          </md-filled-button>
        </div>
      </div>

      <md-dialog ref={dialogRef} id="delete-dialog">
        <div slot="headline">Confirmar Exclusão</div>
        <div slot="content">
          <p>Digite sua senha para confirmar:</p>
          <md-outlined-text-field
            label="Senha"
            type="password"
            value={delPassword}
            onInput={(e: any) => setDelPassword(e.target.value)}
            error={!!delError}
            error-text={delError}
            required
          ></md-outlined-text-field>
        </div>
        <div slot="actions">
          <md-text-button onClick={closeDeleteDialog}>Cancelar</md-text-button>
          <md-filled-button onClick={confirmDelete}>Confirmar</md-filled-button>
        </div>
      </md-dialog>
    </div>
  )
}
