import React from 'react'
import { useForm } from 'react-hook-form'
import NewProjectForm from './components/NewProjectForm'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useOutletContext } from 'react-router-dom'


function NewProject() {

    const {AxiosPrivate} = useOutletContext()

    return (
    <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
        <div className='container'>
            <Breadcrumbs/>
            <NewProjectForm AxiosPrivate={AxiosPrivate}/>
        </div>
    </div>
  )
}

export default NewProject