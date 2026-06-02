import React from 'react'
import ShowUserForm from './components/ShowUserForm'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useOutletContext } from 'react-router-dom'

function ShowUser () {
  const { AxiosPrivate } = useOutletContext()

  return (
    <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
      <div className='container'>
        <Breadcrumbs />
        <ShowUserForm editable={false} AxiosPrivate={AxiosPrivate} />
      </div>
    </div>
  )
}

export default ShowUser
