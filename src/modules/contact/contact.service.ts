import type { RepositoryAdapter } from '@/adapters/repository'
import type { IContact } from './contact.interface'
import type { IUser } from '../user'
import type { CreateContactDto } from './contact.dtos'
import type { IGetParams } from '@/adapters/adapters.interface'

const defaultParams: IGetParams = { orderBy: 'createdAt', order: 'asc' }

class ContactService {
  constructor(private readonly _repository: RepositoryAdapter<IContact>, private readonly _userRepository: RepositoryAdapter<IUser>) {}

  async register(payload: CreateContactDto): Promise<void> {
    const contactAlreadyExists = await this._repository.getOne({ cpf: payload.cpf })

    if (contactAlreadyExists) throw new Error('Contato com esse CPF já cadastrado')

    const address = `${payload.street}, ${payload.number}, ${payload.neighborhood}, ${payload.city}, ${payload.state}`

    const { lat, lng } = await this.getLatLng(address)

    await this._repository.save({
      name: payload.name,
      cpf: payload.cpf,
      phone: payload.phone,
      city: payload.city,
      complement: payload.complement,
      neighborhood: payload.neighborhood,
      number: payload.number,
      state: payload.state,
      region: payload.region,
      street: payload.street,
      zipCode: payload.zipCode,
      userId: payload.userId,
      lat,
      lng
    })
  }

  async getLatLng(address: string) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`

    const response = await fetch(geocodeUrl)
    const data = await response.json()

    const { lat, lng } = data.results[0].geometry.location

    return {
      lat,
      lng
    }
  }

  async getAllContacts(query?: Partial<IContact>, params: IGetParams = defaultParams): Promise<IContact[]> {
    return await this._repository.getAll(query, params)
  }

  async deleteContact(userId: string, id: string): Promise<void> {
    const user = await this._userRepository.getOne({ id: userId })
    if (!user) throw new Error('Usuário não encontrado')

    const contact = await this._repository.getOne({ userId, id })
    if (!contact) throw new Error('Contato não encontrado')
    await this._repository.delete(id)
  }

  async getOne(userId: string, id: string): Promise<IContact> {
    const contact = await this._repository.getOne({ userId, id })
    if (!contact) throw new Error('Contato não encontrado')
    return contact
  }

  async updateContact(userId: string, id: string, payload: CreateContactDto): Promise<void> {
    const contact = await this._repository.getOne({ userId, id })
    if (!contact) throw new Error('Contato não encontrado')

    if (payload.cpf) {
      const contactWithSameCpf = await this._repository.getOne({ cpf: payload.cpf })
      if (contactWithSameCpf && contactWithSameCpf.id !== id) throw new Error('CPF já cadastrado')
    }

    let lat = contact.lat
    let lng = contact.lng

    if (payload.zipCode !== contact.zipCode) {
      const address = `${payload.street}, ${payload.number}, ${payload.neighborhood}, ${payload.city}, ${payload.state}`
      const { lat: $lat, lng: $lng } = await this.getLatLng(address)

      lat = $lat
      lng = $lng
    }

    await this._repository.update(id, {
      name: payload.name,
      cpf: payload.cpf,
      phone: payload.phone,
      city: payload.city,
      complement: payload.complement,
      neighborhood: payload.neighborhood,
      number: payload.number,
      state: payload.state,
      region: payload.region,
      street: payload.street,
      zipCode: payload.zipCode,
      lat,
      lng
    })
  }
}

export default ContactService
