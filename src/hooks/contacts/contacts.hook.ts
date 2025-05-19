import type { IGetParams } from '@/adapters/adapters.interface'
import { contactService } from '@/modules/contact'
import { contactInitializedAtom, contactListAtom, contactLoadingAtom } from '@/state/contact'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import useNotify from '../notify/notify.hook'
import { ENotifyType } from '../notify/notify.interface'
import type { IContact } from '@/modules/contact/contact.interface'
import useAuth from '../auth/auth.hook'

const useContacts = () => {
  const { user } = useAuth()
  const [contacts, setContacts] = useAtom(contactListAtom)
  const [loading, setLoading] = useAtom(contactLoadingAtom)
  const [initialized, setInitialized] = useAtom(contactInitializedAtom)

  const notify = useNotify()

  const fetchContacts = useCallback(async (query: Partial<IContact>, params?: IGetParams) => {
    query.userId = user.id
    try {
      setLoading(true)
      const data = await contactService.getAllContacts(query, params)
      setContacts(data)
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err)
      notify(ENotifyType.ERROR, 'Erro ao buscar contatos')
    } finally {
      setLoading(false)
      setInitialized(true)
    }
  }, [])

  return {
    contacts,
    loading,
    initialized,
    fetchContacts
  }
}

export default useContacts