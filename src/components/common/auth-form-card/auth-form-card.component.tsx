import React from 'react'
import './auth-form-card.style.css'
import type { IAuthFormCardProps } from './auth-form-card.interface'

const AuthFormCard: React.FC<IAuthFormCardProps> = ({ title, subtitle, children }) => (
  <div className="auth-form-card">
    <div className="w-100">
      <span className="auth-form-card-title">{title}</span>
      {subtitle && <span className="auth-form-card-subtitle">{subtitle}</span>}
      {children}
    </div>
  </div>
)

export default AuthFormCard
