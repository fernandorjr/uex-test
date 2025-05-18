import type { RepositoryAdapter } from '@/adapters/repository'
import type { IUser } from './user.interface'
import type { ILoginCredentialsDto, IRecoveryPasswordDto, IResullLoginDto } from './user.dtos'
import type { IContact } from '../contact/contact.interface'

class UserService {
  constructor(private readonly _repository: RepositoryAdapter<IUser>, private readonly _contactRepository: RepositoryAdapter<IContact>) {}

  async getProfile(id: string): Promise<IUser> {
    const user = await this._repository.getOne({ id })

    if (!user) throw new Error('Usuário não encontrado')

    return user
  }

  async login(payload: ILoginCredentialsDto): Promise<IResullLoginDto> {
    const user = await this._repository.getOne({ email: payload.email })

    if (!user) throw new Error('Credenciais inválidas')

    if (payload.password !== atob(user.password)) throw new Error('Credenciais inválidas')

    const randomForToken = Math.random().toString(36).substring(2, 15)

    const token = btoa(`${user.id}:${randomForToken}`)

    return {
      token
    }
  }

  async register(payload: IUser): Promise<void> {
    const userAlreadyExists = await this._repository.getOne({ email: payload.email })
    if (userAlreadyExists) throw new Error('Usuário já cadastrado')

    await this._repository.save({
      ...payload,
      password: btoa(payload.password)
    })
  }

  async recoverPassword(payload: IRecoveryPasswordDto): Promise<void> {
    const user = await this._repository.getOne({ email: payload.email })

    if (!user) throw new Error('Usuário não encontrado')

    if (payload.newPassword === atob(user.password)) throw new Error('Senha igual a anterior')

    if (payload.newPassword !== payload.confirmPassword) throw new Error('As senhas não conferem')

      this._repository.update(user.id, { password: btoa(payload.newPassword) })
  }

  async updateProfile(id: string, payload: Partial<IUser>): Promise<void> {
    const user = await this._repository.getOne({ id })
    if (!user) throw new Error('Usuário não encontrado')

    if (payload.email) {
      const userAlreadyExists = await this._repository.getOne({ email: payload.email })
      if (userAlreadyExists) throw new Error('Usuário com este email já cadastrado')
    }

    await this._repository.update(id, payload)
  }

  async validatePassword(id: string, password: string): Promise<void> {
    const user = await this._repository.getOne({ id })
    if (!user) throw new Error('Credenciais inválidas')

    const isValidPassword = user.password === btoa(password)
    if (!isValidPassword) throw new Error('Credenciais inválidas')
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this._repository.update(id, { password: btoa(password) })
  }

  async deleteProfile(id: string): Promise<void> {
    const user = await this._repository.getOne({ id })
    if (!user) throw new Error('Usuário não encontrado')

     await this._contactRepository.deleteMany({ userId: id })

    await this._repository.delete(id)
  }
}

export default UserService
