import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { contactService } from '@/modules/contact'
import useNotify from '../notify/notify.hook'
import { ENotifyType } from '../notify/notify.interface'
import { contactInitializedAtom, contactListAtom, contactLoadingAtom } from '@/state/contact'

const useContacts = () => {
  const [contacts, setContacts] = useAtom(contactListAtom)
  const [loading, setLoading] = useAtom(contactLoadingAtom)
  const [initialized, setInitialized] = useAtom(contactInitializedAtom)

  const notify = useNotify()

  const fetchContacts = useCallback(async (userId: string) => {
    try {
      setLoading(true)
      const data = await contactService.getAllContacts({ userId })
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