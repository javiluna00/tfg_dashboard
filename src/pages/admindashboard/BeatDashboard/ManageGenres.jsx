import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import useGenres from '@/hooks/useGenres'
import ItemList from './components/ItemList'
import { useOutletContext } from 'react-router-dom'


function ManageGenres() {


    const {AxiosPrivate} = useOutletContext()
    const {genres, loadGenresFromAPI, addGenre, deleteGenre, updateGenre} = useGenres({AxiosPrivate})

    const [name, setName] = useState('')

    useEffect(() => {
        loadGenresFromAPI()
    }, [])

    const handleAddGenreButton = (e) => {
        e.preventDefault()
        addGenre({name})
        setName('')
    }

    return (
        <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
            <div className='container'>
                <Breadcrumbs/>
                <div className='w-full p-5 rounded bg-white'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-2xl text-zinc-900 font-medium'>Gestionar géneros</h3>
                        <Modal title="Añadir nuevo género" icon={"heroicons-outline:plus"} label={"Nuevo"} centered uncontrol labelClass={"btn btn-primary"}>
                            <form onSubmit={handleAddGenreButton}>
                                <input type='text' className='w-full p-2 border border-zinc-300 rounded' placeholder='Nombre del género' value={name} onChange={(e) => setName(e.target.value)}/>
                                <input type='submit' className='btn btn-primary w-full mt-3' value="Añadir" />
                            </form>
                        </Modal>
                    </div>

                    {!genres ? <SkeletionTable/> : <ItemList data_name={"genres"} items={genres} AxiosPrivate={AxiosPrivate}/>}
                </div>
            </div>
        </div>
    )
}

export default ManageGenres