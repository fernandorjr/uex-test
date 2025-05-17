const phoneValidator = (value: string): string | undefined => {
  const cellphoneRegex = /^\d{2}9\d{8}$/

  if (!cellphoneRegex.test(value)) {
    return 'Número de celular inválido'
  }

  return undefined
}

export default phoneValidator
