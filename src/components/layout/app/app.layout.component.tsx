import { Header } from '@/components/common'
import { useAuth } from '@/hooks'
import { Outlet } from 'react-router-dom'
import './app.layout.style.css'

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
