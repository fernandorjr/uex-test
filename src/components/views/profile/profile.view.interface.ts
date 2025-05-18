import type { TErrorForm } from "@/types"

export interface IProfileCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type TErrorProfileForm = TErrorForm<IProfileCredentials>
