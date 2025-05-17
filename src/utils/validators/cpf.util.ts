const calculateDigit = (cpf: string, factor: number, max: number): number => {
  let total = 0
  for (const digit of cpf) {
    if (Number(digit) > max) continue
    total += Number(digit) * factor--
  }
  return total % 11 < 2 ? 0 : 11 - (total % 11)
}

const cpfValidator = (cpf: string): string | undefined => {
  if (!cpf || cpf.length !== 11) return 'CPF inválido'
  if (/^(.)\1+$/.test(cpf)) return 'CPF inválido'
  const cpfArray = cpf.split('').map(Number)
  const firstDigit = calculateDigit(cpf.slice(0, 9), 10, 9)
  const secondDigit = calculateDigit(cpf.slice(0, 9) + firstDigit, 11, 9)

  const [first, second] = cpfArray.slice(9, 11)

  if (first !== firstDigit || second !== secondDigit) return 'CPF inválido'

  return undefined
}

export default cpfValidator
