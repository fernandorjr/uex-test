import type { TErrorForm } from "@/types"

export interface IUserRegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type TErrorRegisterForm = TErrorForm<IUserRegisterPayload>