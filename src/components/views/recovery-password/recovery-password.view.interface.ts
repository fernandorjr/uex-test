import type { TErrorForm } from "@/types"

export interface IRecoveryPasswordCredentials {
  email: string
  newPassword: string
  confirmNewPassword: string
}

export type TErrorRecoveryPasswordForm = TErrorForm<IRecoveryPasswordCredentials>
