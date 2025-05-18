import type { TErrorForm } from "@/types"

export interface IRegisterCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type TErrorRegisterForm = TErrorForm<IRegisterCredentials>