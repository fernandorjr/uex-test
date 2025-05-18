import { ContactDetails, ContactList, ModalContactDetails } from '@/components/common'
import './dashboard.view.style.css'
import { useEffect, useState } from 'react'
import type { Contact } from '@/components/common/contact-list/contact-list.component'

export default function DashboardView() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 577)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 577)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleSelectContact = (contact: Contact) => {
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
        <ContactList onSelect={handleSelectContact} />
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
