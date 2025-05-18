import { Header } from '@/components/common'
import { Outlet } from 'react-router-dom'
import './app.layout.style.css'

const AppLayout = () => {

  return  (
    <div className="system-layout">
      <Header />
      <Outlet />
    </div>
  )
}

export default AppLayout
