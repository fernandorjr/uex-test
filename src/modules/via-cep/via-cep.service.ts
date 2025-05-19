import type { ResultAddressDto, ViaCepAddressDto } from './via-cep-address.dto'

class ViaCepService {
  constructor() {}

  private cachedData: Record<string, ResultAddressDto> = {}

  async get(cep: string) {
    try {
      const alreadyHasData = this.cachedData[cep]
      if (alreadyHasData) return alreadyHasData

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const json = await response.json()
      if (json.erro) throw new Error('CEP não encontrado')

      const data = this.parseAddress(json)

      this.cachedData[cep] = data

      return data
    } catch {
      throw new Error('CEP não encontrado')
    }
  }

  parseAddress(address: ViaCepAddressDto): ResultAddressDto {
    return {
      street: address.logradouro,
      neighborhood: address.bairro,
      state: address.uf,
      complement: address.complemento,
      region: address.regiao,
      zipCode: address.cep.replace('-', ''),
      city: address.localidade
    }
  }
}

export default ViaCepService
