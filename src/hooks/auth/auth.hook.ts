import { systemAtom } from '@/state/system'
import { userAtom } from '@/state/user'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import useStorage from '../storage/storage.hook'
import useNavigate from '../navigate/navigate.hook'
import useNotify from '../notify/notify.hook'
import { ENotifyType } from '../notify/notify.interface'
import { userService } from '@/modules/user'
import { ERoutes } from '@/tokens/routes'
import { EAuthTokens } from '@/tokens/auth'

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const [system, setSystem] = useAtom(systemAtom)
  const [userId, setUserId] = useState<string | null>(null)

  const { getStorage } = useStorage()
  const { navigate } = useNavigate()
  const notify = useNotify()

  const getMe = async () => {
    try {
      if (!userId || !system.checking) return

      const $user = await userService.getProfile(userId)

      setUser($user)
      navigate(ERoutes.DASHBOARD)
      setSystem({ checking: false })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message) notify(ENotifyType.ERROR, error.message)
    }
  }

  const handleRefresh = async () => {
    try {
      setSystem({ refreshing: true })

      const $updated = await userService.getProfile(user.id)

      setUser($updated)

      setSystem({ refreshing: false })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message) notify(ENotifyType.ERROR, error.message)
    }
  }

  useEffect(() => {
    const token = getStorage(EAuthTokens.TOKEN)

    if (token) {
      const [userId] = atob(token).split(':')
      setUserId(userId)
    } else {
      navigate(ERoutes.LOGIN)
      setSystem({
        checking: false
      })
    }
  }, [])

  useEffect(() => {
    getMe()
  }, [userId])

  return {
    user: user,
    setUser,

    checking: system.checking,
    refreshing: system.refreshing,
    refresh: handleRefresh
  }
}

export default useAuth
