const sizeValidator = (value: string): string | undefined => {
  if (value.length < 2) {
    return 'Tamanho mínimo de 2 caracteres'
  }

  return undefined
}

export default sizeValidator
