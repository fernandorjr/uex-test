import { ERoutes } from '@/tokens/routes'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate as useNavigateRRD, useParams as useParamsRRD } from 'react-router-dom'

const useNavigate = () => {
  const router = useNavigateRRD()
  const params = useParamsRRD()
  const [currPath, setCurrPath] = useState<ERoutes>(ERoutes.LOGIN)

  const navigate = useCallback(
    (path: ERoutes) => {
      router(path)
    },
    [router]
  )

  useEffect(() => {
    setCurrPath(window.location.pathname as ERoutes)
  }, [window.location.pathname])

  return { currPath, navigate, params }
}

export default useNavigate
