import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React, { useEffect } from 'react'
import ShowContactForm from './components/ShowContactForm'
import useContact from '@/hooks/useContact'
import { useParams } from 'react-router-dom'

function ShowContact () {
  const { getContact, contact, isLoading, updateContact } = useContact()
  const { id } = useParams()
  useEffect(() => {
    getContact(id)
  }, [])

  return (
    <div className='bg-zinc-50 py-10 w-full h-full min-h-[90vh]'>
      <div className='container'>
        <Breadcrumbs />
        <ShowContactForm getContact={getContact} contact={contact} isLoading={isLoading} updateContact={updateContact} />
      </div>
    </div>
  )
}

export default ShowContact
