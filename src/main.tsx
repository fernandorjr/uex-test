import '@material/web/all.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import '@/styles/global.style.css'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    <App />
  </StrictMode>
)
