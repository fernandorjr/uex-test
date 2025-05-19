import type { TErrorForm } from "@/types"

export interface IProfileForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type TErrorProfileForm = TErrorForm<IProfileForm>
