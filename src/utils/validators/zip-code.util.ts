const zipCodeValidator = (cep: string): string | undefined => {
  const cepRegex = /^\d{5}\d{3}$/

  if (!cepRegex.test(cep)) {
    return 'Número de CEP inválido'
  }

  return undefined
}

export default zipCodeValidator
