import { userService } from '@/modules/user'
import { systemAtom } from '@/state/system'
import { userAtom } from '@/state/user'
import { EAuthTokens } from '@/tokens/auth'
import { ERoutes } from '@/tokens/routes'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import useNavigate from '../navigate/navigate.hook'
import useStorage from '../storage/storage.hook'

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const [system, setSystem] = useAtom(systemAtom)
  const [userId, setUserId] = useState<string | null>(null)

  const { getStorage, setStorage, delStorage } = useStorage()
  const { navigate } = useNavigate()

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        const data = await userService.login(credentials)
        setStorage(EAuthTokens.TOKEN, data.token)
        const [userId] = atob(data.token).split(':')
        setUserId(userId)

        const $user = await userService.getProfile(userId)
        setUser($user)
        navigate(ERoutes.DASHBOARD)
        setSystem({
          checking: false
        })
      } catch (error: any) {
        throw new Error(error.message || 'Falha ao fazer login')
      }
    },
    [setStorage]
  )

  const removeSession = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        delStorage(EAuthTokens.TOKEN)
        setUserId(null)
        setUser({})
        navigate(ERoutes.LOGIN)
        setSystem({
          checking: false
        })
        resolve()
      } catch (error: any) {
        reject(new Error(error.message || 'Falha ao fazer logout'))
      }
    })
  }

  const logout = useCallback(async () => {
    try{
      await removeSession()
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao fazer logout')
    }
  }, [setStorage])

  const getMe = useCallback(async () => {
    try {
      if (!userId || !system.checking) return

      const $user = await userService.getProfile(userId)
      setUser($user)
      navigate(ERoutes.DASHBOARD)
      setSystem({
        checking: false
      })
    } catch (error) {
      console.error(error)
    }
  }, [userId, system.checking])

  const handleRefresh = useCallback(async () => {
    try {
      setSystem({
        refreshing: true
      })
      const updated = await userService.getProfile(user.id)
      setUser(updated)
      setSystem({
        refreshing: false
      })
    } catch (error) {
      console.error(error)
    }
  }, [userId, user])

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
    login,
    logout,
    checking: system.checking,
    refreshing: system.refreshing,
    refresh: handleRefresh
  }
}

export default useAuth
