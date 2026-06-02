import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React from 'react'
import NewBeatForm from './components/NewBeatForm'
import { useOutletContext } from 'react-router-dom'

function NewBeat() {

  const {AxiosPrivate} = useOutletContext()

  return (
    <div className='bg-slate-50 py-10 w-full h-full min-h-screen'>
        <div className='container'>
            <Breadcrumbs/>
            <NewBeatForm AxiosPrivate={AxiosPrivate}/>
        </div>
    </div>
  )
}

export default NewBeat