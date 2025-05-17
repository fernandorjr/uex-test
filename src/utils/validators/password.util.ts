const passwordValidator = (value: string): string | undefined => {
  const regex = /^[a-zA-Z0-9]{6,}$/

  if (value.length < 6) {
    return 'Deve conter no mínimo 6 caracteres'
  }

  if (!regex.test(value)) {
    return 'Deve contar apenas letras e números'
  }

  return undefined
}

export default passwordValidator
