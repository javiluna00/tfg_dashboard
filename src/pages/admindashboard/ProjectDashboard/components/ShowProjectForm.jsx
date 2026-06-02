import SkeletionTable from '@/components/skeleton/Table'
import Button from '@/components/ui/Button'
import useProjects from '@/hooks/useProjects'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

function ShowProjectForm ({ editable = false, AxiosPrivate }) {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const { getOneProject, updateProject } = useProjects({ AxiosPrivate })
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const [imagePath, setImagePath] = useState(null)
  const [originalImagePath, setOriginalImagePath] = useState(null)

  const [imageInput, setImageInput] = useState(null)

  const imageInputRef = useRef()

  useEffect(() => {
    if (!imagePath) {
      setImagePath(null)
      return
    }

    const objectUrl = URL.createObjectURL(imageInput)
    setImagePath(objectUrl)
  }, [imageInput])

  useEffect(() => {
    setLoading(true)
    getOneProject(id).then((res) => {
      setProject(res)
      setImagePath(res.image)
      setOriginalImagePath(res.image)
      reset(res)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const onSubmit = (data) => {
    if (!editable) return

    console.log('imageInput : ', imageInput)

    if (imageInput == null || imagePath == originalImagePath) {
      delete data.image
    }

    const formData = new FormData()
    Object.keys(data).forEach(key => formData.append(key, data[key]))
    if (imageInput && imagePath != originalImagePath) {
      formData.append('image', imageInputRef.current.files[0])
    }

    updateProject(id, formData)
  }

  const handleResetButton = () => {
    setImagePath(originalImagePath)
    imageInputRef.current.value = null
  }

  return (

    <div className='w-full'>
      <div className='w-[70%] mx-auto flex flex-col justify-center items-center'>
        {loading
          ? <SkeletionTable />
          : <div className='w-full flex flex-col justify-center items-center gap-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className='text-3xl text-slate-900 font-bold mb-5'>{editable ? 'Editar' : 'Ver'} proyecto</h2>
              <div className='w-full flex justify-center items-center gap-5'>

                <div className='w-1/2 flex justify-start items-start gap-5 mt-5'>
                  <div>
                    <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Portada</span>
                    <img src={imagePath || 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'} className='w-full object-cover aspect-square' alt='' />
                    {editable &&
                        <div className='w-full flex justify-center items-center gap-5 mt-5'>
                        <input ref={imageInputRef} type='file' className='bg-primary-400 hover:bg-primary-500 duration-150 text-white w-full block mt-5' onChange={(e) => setImageInput(e.target.files[0])} />
                        <Button className='rounded-full bg-red-500 text-white w-10 h-10' icon='fa-solid:undo' onClick={handleResetButton} />
                      </div>}
                  </div>
                </div>

                <div className='w-1/2 flex flex-col justify-start items-start gap-5 mt-5'>
                  <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Nombre</span>
                  <input type='text' className='w-full bg-slate-100 px-5 py-3 rounded border border-slate-300 focus:border-primary-500 focus:outline-none' disabled={!editable} label='Nombre' placeholder='Nombre del proyecto' name='name' defaultValue={project.name} {...register('name')} />
                  <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Descripción</span>
                  <textarea type='text' className='w-full bg-slate-100 px-5 py-3 rounded border border-slate-300 focus:border-primary-500 focus:outline-none' disabled={!editable} label='Descripción' placeholder='Descripción' name='description' defaultValue={project.description} {...register('description')} />
                  <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Link de youtube</span>
                  <input type='text' className='w-full bg-slate-100 px-5 py-3 rounded border border-slate-300 focus:border-primary-500 focus:outline-none' disabled={!editable} label='Link de youtube' placeholder='Link de youtube' name='yt_link' defaultValue={project.yt_link ? project.yt_link : ''} {...register('yt_link')} />
                  <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Link de spotify</span>
                  <input type='text' className='w-full bg-slate-100 px-5 py-3 rounded border border-slate-300 focus:border-primary-500 focus:outline-none' disabled={!editable} label='Link de spotify' placeholder='Link de youtube' name='spotify_link' defaultValue={project.spotify_link ? project.spotify_link : ''} {...register('spotify_link')} />

                </div>
              </div>

              {editable && <Button type='submit' text='Guardar' className='btn-primary w-full mt-5' />}
            </form>

            </div>}
      </div>
    </div>

  )
}

export default ShowProjectForm
