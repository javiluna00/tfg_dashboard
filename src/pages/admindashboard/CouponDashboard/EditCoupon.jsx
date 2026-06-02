import React from 'react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useLocation, useOutletContext } from 'react-router-dom'
import CouponForm from './components/CouponForm'

function EditCoupon () {
  const { AxiosPrivate } = useOutletContext()
  const { state: coupon } = useLocation()

  return (
    <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
      <div className='container'>
        <Breadcrumbs />
        <CouponForm AxiosPrivate={AxiosPrivate} coupon={coupon} />
      </div>
    </div>
  )
}

export default EditCoupon
