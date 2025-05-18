import { useNavigate } from '@/hooks'
import { ERoutes } from '@/tokens/routes'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './app.layout.style.css'
import { Header } from '@/components/common'

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
      <Header />
      <Outlet />
    </div>
  )
}

export default AppLayout
