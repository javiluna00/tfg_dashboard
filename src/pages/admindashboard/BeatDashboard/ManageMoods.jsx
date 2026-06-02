import Breadcrumbs from '@/components/ui/Breadcrumbs'
import useMoods from '@/hooks/useMoods'
import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import ItemList from './components/ItemList'
import { useOutletContext } from 'react-router-dom'

function ManageMoods() {


    const {AxiosPrivate} = useOutletContext()
    const {moods, loadMoodsFromAPI, addMood} = useMoods({AxiosPrivate})

    const [name, setName] = useState('')


    useEffect(() => {
        loadMoodsFromAPI()
    }, [])

    const handleAddMoodButton = (e) => {
        e.preventDefault()
        addMood({name})
        setName('')
    }

    return (
        <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
            <div className='container'>
                <Breadcrumbs/>
                <div className='w-full p-5 rounded bg-white'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-2xl text-zinc-900 font-medium'>Gestionar moods</h3>
                        <Modal title="Añadir nuevo mood" icon={"heroicons-outline:plus"} label={"Nuevo"} centered uncontrol labelClass={"btn btn-primary"}>
                            <form onSubmit={handleAddMoodButton}>
                                <input type='text' className='w-full p-2 border border-zinc-300 rounded' placeholder='Nombre del mood' value={name} onChange={(e) => setName(e.target.value)}/>
                                <input type='submit' className='btn btn-primary w-full mt-3' value="Añadir" />
                            </form>
                        </Modal>
                    </div>

                    {!moods ? <SkeletionTable/> : <ItemList data_name={"moods"} items={moods} AxiosPrivate={AxiosPrivate}/>}
                </div>
            </div>
        </div>
    )
}

export default ManageMoods