import { ContactDetails, ContactList, ModalContactDetails } from '@/components/common'
import './dashboard.view.style.css'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks'
import type { IContact } from '@/modules/contact/contact.interface'

export default function DashboardView() {
  const { user } = useAuth()

  const [selectedContact, setSelectedContact] = useState<IContact | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 577)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 577)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleSelectContact = (contact: IContact) => {
    setSelectedContact(contact)
    if (isMobile) {
      setIsDialogOpen(true)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedContact(null)
  }

  return (
    <div className="dashboard-content">
      <section className="contacts-panel">
        <ContactList userId={user.id} onSelect={handleSelectContact} />
      </section>

      {!isMobile && (
        <section className="details-panel">
          <ContactDetails contact={selectedContact} />
        </section>
      )}

      {/* Modal on mobile */}
      {isMobile && selectedContact && (
        <ModalContactDetails
          open={isDialogOpen}
          contact={selectedContact}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  )
}
