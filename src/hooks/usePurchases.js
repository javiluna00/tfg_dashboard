import { useState } from 'react'
import { toast } from 'react-toastify'

function usePurchases (AxiosPrivate) {

  const [purchases, setPurchases] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const getPurchasesFromAPI = () => {
    setIsLoading(true)
    AxiosPrivate.get('/purchase')
      .then((response) => {
        setPurchases(response.data)
      })
      .catch((error) => {
        console.log(error)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  const resendEmail = (purchaseId) => {
    console.log("Purchase id :", purchaseId)
    AxiosPrivate.post(`/purchase/${purchaseId}/resend-email`)
      .then(() => toast.success('Email reenviado correctamente'))
      .catch((e) => toast.error(`Error al reenviar el email : ${e.response.data.message}`))
  }

  return { purchases, getPurchasesFromAPI, resendEmail, isLoading }
}

export default usePurchases
