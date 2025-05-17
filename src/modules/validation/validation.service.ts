import { validators } from '@/utils/validators'

class ValidationService {
  validate(name: keyof typeof validators, value: string, required?: boolean): string | undefined {
    if (required && !value) return 'Campo obrigatório'
    return validators[name](value)
  }
}

export default ValidationService
