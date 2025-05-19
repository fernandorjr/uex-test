import { Header } from '@/components/common'
import { Outlet } from 'react-router-dom'
import './app.layout.style.css'
import { useAuth } from '@/hooks'

const AppLayout = () => {
  const { checking } = useAuth()

  return checking ? null : (
    <div className="system-layout">
      <Header />
      <Outlet />
    </div>
  )
}

export default AppLayout
