import React from 'react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useOutletContext } from 'react-router-dom'
import CouponForm from './components/CouponForm'

function NewCoupon () {
  const { AxiosPrivate } = useOutletContext()

  return (
    <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
      <div className='container'>
        <Breadcrumbs />
        <CouponForm AxiosPrivate={AxiosPrivate} />
      </div>
    </div>
  )
}

export default NewCoupon
