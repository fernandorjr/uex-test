import { Outlet } from "react-router-dom"
import "./auth.layout.style.css"
import { useAuth } from "@/hooks"

const AuthLayout = () => {
  const { checking } = useAuth()
  
  return checking ? null : (
    <div className="auth-layout-container">
      <Outlet />
      <span className="auth-layout-author">Fernando Rodrigues</span>
    </div>
  )
}

export default AuthLayout