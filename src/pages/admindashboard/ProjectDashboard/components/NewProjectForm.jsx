import Button from '@/components/ui/Button';
import Switch from '@/components/ui/Switch';
import Textinput from '@/components/ui/Textinput';
import useProjects from "@/hooks/useProjects";
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

function NewProjectForm({AxiosPrivate}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createProject} = useProjects({AxiosPrivate})
    const [coverFile, setCoverFile] = useState(null)
    const [previewCover, setPreviewCover] = useState(null)
    const [active, setActive] = useState(1)

    useEffect(() => {
        if (!coverFile) {
            setPreviewCover(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(coverFile)
        setPreviewCover(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [coverFile])



    const onSubmit = (data) => {
        if (!coverFile) {
            toast.error("Por favor, selecciona una imagen de portada para el proyecto.");
            return;
        }
        const formData = new FormData();
        // Agregar los datos del formulario al objeto FormData
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        // Agregar el archivo de la imagen de portada
        formData.append('image', coverFile);
        formData.append('active', active);

        createProject(formData).then((res) => {
            reset()
        }).catch((err) => {
            console.log(err)
        })

    }

    return (

    <div className='w-full'>
        <div className="w-[70%] mx-auto flex flex-col justify-center items-center">
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-3xl text-slate-900 font-bold mb-5'>Subir nuevo proyecto</h2>
                <Textinput label="Nombre" placeholder="Nombre del proyecto" name="name" register={register} />
                <Textinput label="Descripción" placeholder="Descripción" name="description" register={register} />
                <Textinput label="Link de youtube" placeholder="Link de youtube" name="yt_link" register={register} />
                <Textinput label="Link de spotify" placeholder="Link de youtube" name="spotify_link" register={register} />
                
                <div className="mt-5">
                    <Switch className="mt-5" label="Visible" name="active" value={active} onChange={() => setActive(active == 1 ? 0 : 1)}/>
                </div>
                

                <div className='w-full flex justify-start items-start gap-5 mt-5'> 
                    <div className='w-1/2'>
                        <label htmlFor="cover_file" className='class-label block text-sm font-medium mb-2.5 pt-1'>Portada</label>
                        <input type="file" label="Portada" placeholder="Portada" name="cover_file" onChange={(e) => setCoverFile(e.target.files[0])}/>
                    </div>
                    <div className='w-1/2'>
                        <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Previsualización de la portada</span>
                        <img src={previewCover || "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} className="w-24 h-24" />
                    </div>
                </div>
                <Button type="submit">Crear</Button>
            </form>
        </div>
    </div>
  
  )
}

export default NewProjectForm