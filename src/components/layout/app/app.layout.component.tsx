import { useNavigate } from '@/hooks'
import { ERoutes } from '@/tokens/routes'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './app.layout.style.css'

const AppLayout = () => {
  const { navigate } = useNavigate()

  useEffect(() => {
    const user = true

    if (!user) {
      navigate(ERoutes.LOGIN)
    }
  }, [navigate])

  return (
    <div className="system-layout">
      <Outlet />
    </div>
  )
}

export default AppLayout
