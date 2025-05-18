import { LocalStorageAdapter } from '@/adapters/local-storage'
import type { IUser } from './user.interface'
import { ERepositoriesTokens } from '@/tokens/repositories'
import { RepositoryAdapter } from '@/adapters/repository'
import UserService from './user.service'
import type { IContact } from '../contact/contact.interface'

export { default as UserService } from './user.service'

const userStorage = new LocalStorageAdapter<IUser>(ERepositoriesTokens.USER)
const contactStorage = new LocalStorageAdapter<IContact>(ERepositoriesTokens.CONTACT)
const userRepository = new RepositoryAdapter<IUser>(userStorage)
const contactRepository = new RepositoryAdapter<IContact>(contactStorage)
const userService = new UserService(userRepository, contactRepository);

export * from "@/modules/user/user.interface"
export { userService }