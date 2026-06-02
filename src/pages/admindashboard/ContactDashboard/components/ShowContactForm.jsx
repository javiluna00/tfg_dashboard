import SkeletionTable from '@/components/skeleton/Table'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ShowContactForm ({ contact, isLoading, updateContact }) {
  const navigate = useNavigate()
  const handleCopyEmailToClipboard = () => {
    navigator.clipboard.writeText(contact.email)
    toast.success('Email copiado al portapapeles')
  }
  const handleToogleRead = () => {
    updateContact(contact.id, { read: contact.read ? 0 : 1 }).then((res) => {
      toast.success(res.message)
      navigate('/dashboard/contacts')
    }).catch((err) => {
      console.log(err)
    })
  }

  const MessageData = ({ contact }) => {
    return (
      <div className='flex flex-col justify-center items-center gap-4 px-10'>
        <div className='w-full p-5 rounded-lg flex flex-col justify-center items-start gap-4'>
          <h1 className='text-xl font-bold uppercase text-center text-gray-200'>{contact.name} {contact.artistic_name && `(${contact.artistic_name})`}</h1>
          <div className='flex justify-start items-center gap-4 '>
            <p className='text-sm text-gray-200'>{contact.email}</p>
            <Tooltip content='Copiar al portapapeles'>
              <div><Icon icon='mdi:content-copy' className='text-gray-400 cursor-pointer hover:text-gray-200' onClick={handleCopyEmailToClipboard} /></div>
            </Tooltip>
          </div>
        </div>
        <div className='w-full p-5 bg-zinc-50 rounded-lg flex flex-col justify-center items-start gap-4'>
          <h3 className='text-lg font-bold uppercase text-gray-900'>{contact.subject}</h3>
          <p className='text-sm text-zinc-900 bg-zinc-50'>{contact.message}</p>
        </div>
        <div className='w-full flex justify-start items-center'>
          <Button text={contact.read === 0 ? 'Marcar como leido' : 'Marcar como no leido'} type='primary' onClick={handleToogleRead} />
        </div>
      </div>
    )
  }

  return (
    <div className='py-5 w-full bg-zinc-900 rounded-lg'>
      {isLoading && <SkeletionTable />}
      {!isLoading && contact &&
        <MessageData contact={contact} />}
    </div>
  )
}

export default ShowContactForm
