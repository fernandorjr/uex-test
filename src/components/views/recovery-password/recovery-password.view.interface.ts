import type { TErrorForm } from "@/types"

export interface IRecoveryPasswordCredentials {
  email: string
  newPassword: string
  confirmPassword: string
}

export type TErrorRecoveryPasswordForm = TErrorForm<IRecoveryPasswordCredentials>
