import { LocalStorageAdapter } from '@/adapters/local-storage'
import type { IUser } from './user.interface'
import { ERepositoriesTokens } from '@/tokens/repositories'
import { RepositoryAdapter } from '@/adapters/repository'
import UserService from './user.service'

export { default as UserService } from './user.service'

const userStorage = new LocalStorageAdapter<IUser>(ERepositoriesTokens.USER)
const userRepository = new RepositoryAdapter<IUser>(userStorage)
const userService = new UserService(userRepository);

export * from "@/modules/user/user.interface"
export { userService }