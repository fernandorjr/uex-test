import type { TErrorForm } from "@/types"

export interface ICredentials {
  email: string
  password: string
}

export type TErrorCredentialsForm = TErrorForm<ICredentials>