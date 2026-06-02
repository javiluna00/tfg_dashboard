import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import useGenres from '@/hooks/useGenres'
import React, { useEffect, useState } from 'react'

function GenreItem({genre, AxiosPrivate}) {

    const {deleteGenre, updateGenre} = useGenres({AxiosPrivate})



    const [name, setName] = useState('')

    useEffect(() => {
        setName(genre.name)
    }, [genre])

    const handleDeleteGenreButton = (e) => {
        e.preventDefault()
        deleteGenre(genre.id)
    }

    const handleUpdateGenreButton = (e) => {
        e.preventDefault()
        updateGenre({id: genre.id, name})
    }

    return (
        <div className='flex flex-col justify-center items-center gap-1 bg-zinc-900 rounded p-3'>
            <div className='p-3 text-center rounded text-white'>
                {genre.name}
            </div>
            <div className='flex  justify-center gap-3'>
                <Modal title="Modificar mood" labelClass={"text-white bg-red-500"} centered uncontrol icon={"heroicons-outline:pencil"}>
                    <div className='flex justify-center items-center gap-5'>
                        <input type='text' className='w-full p-2 border border-zinc-300 rounded' placeholder='Nombre del género' value={name} onChange={(e) => setName(e.target.value)}/>
                        <Button text="Aceptar" className='btn btn-primary' onClick={handleUpdateGenreButton}/>
                    </div>
                </Modal>                
                <Modal title="¿Estas seguro de eliminar este género?" labelClass={"text-white bg-red-500"} centered uncontrol icon={"heroicons-outline:trash"}>
                    <div className='flex justify-center items-center gap-5'>
                        <Button text={"Cancelar"} className='btn border border-zinc-900'/>
                        <Button text="Eliminar" className='btn btn-primary' onClick={handleDeleteGenreButton}/>
                    </div>
                </Modal>
            </div>
        </div>

    )
}

export default GenreItem