import type { IAddress } from "./address.interface"

export interface ViaCepAddressDto {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  uf: string
  localidade: string
  estado: string
  regiao: string
}

export type ResultAddressDto = IAddress
