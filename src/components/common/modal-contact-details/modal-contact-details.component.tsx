// @ts-nocheck
import { useEffect, useRef, type FC } from 'react'
import type { IModalContactDetailsProps } from './modal-contact-details.interface'
import ContactDetails from '../contact-details/contact-details.component'


const ModalContactDetails: FC<IModalContactDetailsProps> = ({ open, contact, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // Sincroniza o estado React com o close do componente
    const onDialogClose = () => onClose()
    dialog.addEventListener('close', onDialogClose)
    return () => dialog.removeEventListener('close', onDialogClose)
  }, [onClose])

  return (
    <md-dialog ref={dialogRef} open={open}>
      <div slot="headline">Detalhes do Contato</div>
      <div slot="content">
        <ContactDetails contact={contact} />
      </div>
      <div slot="actions">
        <md-text-button onClick={() => dialogRef.current?.close()}>Fechar</md-text-button>
      </div>
    </md-dialog>
  )
}

export default ModalContactDetails