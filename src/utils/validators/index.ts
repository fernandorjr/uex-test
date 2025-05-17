import { default as cpfValidator } from './cpf.util'
import { default as emailValidator } from './email.util'
import { default as nameValidator } from './name.util'
import { default as passwordValidator } from './password.util'
import { default as phoneValidator } from './phone.util'
import { default as sizeValidator } from './size.util'
import { default as zipCodeValidator } from './zip-code.util'

export const validators = {
  cpf: cpfValidator,
  zipCode: zipCodeValidator,
  email: emailValidator,
  name: nameValidator,
  password: passwordValidator,
  phone: phoneValidator,
  size: sizeValidator
}
