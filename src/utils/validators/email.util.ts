const emailValidator = (email: string): string | undefined => {
  const emailRegex = /^[a-zA-Z0-9!#$%&._%+-]+@[a-z0-9.-]+\.[a-z]{2,}(?:\.[a-z]{2,})?$/i

  if (!emailRegex.test(email)) {
    return 'E-mail inválido'
  }

  return undefined
}

export default emailValidator
