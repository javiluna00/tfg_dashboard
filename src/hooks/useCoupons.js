import { useState } from 'react'
import { toast } from 'react-toastify'

function useCoupons ({ AxiosPrivate }) {
  const [coupons, setCoupons] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllCoupons = () => {
    setIsLoading(true)
    AxiosPrivate.get('/coupon').then((res) => {
      setCoupons(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const createCoupon = (data) => {
    return AxiosPrivate.post('/coupon', data).then((res) => {
      toast.success('Cupón creado correctamente')
      return res.data
    }).catch((err) => {
      const errors = err.response?.data?.errors
      if (errors) {
        Object.values(errors).flat().forEach(msg => toast.error(msg))
      } else {
        toast.error('Error al crear el cupón')
      }
      throw err
    })
  }

  const updateCoupon = (id, data) => {
    return AxiosPrivate.patch(`/coupon/${id}`, data).then((res) => {
      return res.data
    }).catch((err) => {
      toast.error('Error al actualizar el cupón')
      throw err
    })
  }

  const deleteCoupon = (id) => {
    AxiosPrivate.delete(`/coupon/${id}`).then(() => {
      toast.success('Cupón eliminado correctamente')
      getCoupons()
    }).catch(() => {
      toast.error('Error al eliminar el cupón')
    })
  }

  // alias interno para re-fetch tras delete
  const getCoupons = () => {
    AxiosPrivate.get('/coupon').then((res) => {
      setCoupons(res.data)
    }).catch(() => {})
  }

  return { coupons, isLoading, getAllCoupons, createCoupon, updateCoupon, deleteCoupon }
}

export default useCoupons
