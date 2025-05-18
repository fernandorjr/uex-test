import { toast } from 'react-toastify'
import type { ToastContent, ToastOptions } from 'react-toastify'
import type { ENotifyType } from './notify.interface'

const useNotify = () => {
  const notify = (type: ENotifyType, message: ToastContent, options?: ToastOptions) => {
    return toast[type](message, options)
  }

  return notify
}

export default useNotify
