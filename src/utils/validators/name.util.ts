const nameValidator = (name: string): string | undefined => {
  const regex = /^[A-ZÀ-ÖØ][a-zA-ZÀ-ÖØ-öø-ÿ]*(\s+[a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/
  const numberRegex = /[0-9]/

  if (name.length < 2) {
    return 'Tamanho mínimo de 2 caracteres'
  }

  if (numberRegex.test(name)) {
    return 'Não pode conter números'
  }

  if (!regex.test(name)) {
    return 'Deve iniciar com letra maiúscula'
  }

  return undefined
}

export default nameValidator
