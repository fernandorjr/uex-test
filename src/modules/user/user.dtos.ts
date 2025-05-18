export interface ILoginCredentialsDto {
  email: string
  password: string
}

export interface IResullLoginDto {
  token: string
}

export interface IRecoveryPasswordDto {
  email: string
  password: string
  confirmPassword: string
}