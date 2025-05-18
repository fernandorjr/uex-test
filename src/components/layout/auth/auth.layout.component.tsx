import { Outlet } from "react-router-dom"
import "./auth.layout.style.css"

const AuthLayout = () => {
  
  return (
    <div className="auth-layout-container">
      <Outlet />
      <span className="auth-layout-author">Fernando Rodrigues</span>
    </div>
  )
}

export default AuthLayout