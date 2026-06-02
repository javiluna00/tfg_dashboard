import CustomAxios from '@/components/api/axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useContact = () => {
  const [contact, setContact] = useState(null)
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { AxiosPrivate } = CustomAxios()
  const [contactoData, setContactoData] = useState({

    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    artistic_name: ''

  })

  const sendForm = async (data) => {
    AxiosPrivate.post('contact/', data)
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  const getContacts = () => {
    setIsLoading(true)
    AxiosPrivate.get('/message/').then((res) => {
      setContacts(res.data.data)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const getContact = (id) => {
    setIsLoading(true)
    AxiosPrivate.get(`/message/${id}`).then((res) => {
      setContact(res.data.data)
    })
    setIsLoading(false)
  }

  const updateContact = (id, contactData) => {
    setIsLoading(true)
    return AxiosPrivate.patch(`/message/${id}`, contactData).then((res) => {
      return res.data
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return {
    contactoData,
    setContactoData,
    sendForm,
    getContact,
    getContacts,
    contacts,
    contact,
    isLoading,
    updateContact
  }
}

export default useContact
