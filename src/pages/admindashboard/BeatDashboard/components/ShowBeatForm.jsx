import Textinput from '@/components/ui/Textinput'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomSelector from './CustomSelector'
import useMoods from '@/hooks/useMoods'
import useGenres from '@/hooks/useGenres'
import Switch from '@/components/ui/Switch'
import Button from '@/components/ui/Button'
import useBeats from '@/hooks/useBeats'
import ProgressBar from '@/components/ui/ProgressBar'

function ShowBeatForm ({ beat, editable, AxiosPrivate }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { moods, loadMoodsFromAPI } = useMoods({ AxiosPrivate })
  const { genres, loadGenresFromAPI } = useGenres({ AxiosPrivate })
  const [exclusiveSwitch, setExclusiveSwitch] = useState(false)
  const [selectedMoods, setSelectedMoods] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [activeSwitch, setActiveSwitch] = useState(false)
  const [mp3File, setMp3File] = useState(null)
  const [wavFile, setWavFile] = useState(null)
  const [stemsFile, setStemsFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [previewCover, setPreviewCover] = useState(null)
  const [taggedFile, setTaggedFile] = useState(null)
  const [taggedPath, setTaggedPath] = useState(null)

  const coverFileRef = useRef()
  const taggedFileRef = useRef()
  const mp3FileRef = useRef()
  const wavFileRef = useRef()
  const stemsFileRef = useRef()

  const { updateBeat, updatedProgress } = useBeats({ AxiosPrivate })

  const onSubmit = (data) => {
    if (!editable) return

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('scale', data.scale)
    formData.append('bpm', data.bpm)
    formData.append('mp3_price_eur', data.mp3_price_eur)
    formData.append('wav_price_eur', data.wav_price_eur)
    formData.append('stems_price_eur', data.stems_price_eur)
    formData.append('active', activeSwitch ? 1 : 0)

    selectedMoods.forEach(mood => formData.append('moods[]', mood))
    selectedGenres.forEach(genre => formData.append('genres[]', genre))

    if (coverFile != null) formData.append('cover_file', coverFile)
    if (taggedFile != null) formData.append('tagged_file', taggedFile)
    if (mp3File != null) formData.append('mp3_file', mp3File)
    if (wavFile != null) formData.append('wav_file', wavFile)
    if (stemsFile != null) formData.append('stems_file', stemsFile)

    updateBeat(beat.id, formData)
  }

  useEffect(() => {
    loadMoodsFromAPI()
    loadGenresFromAPI()
  }, [])

  useEffect(() => {
    setExclusiveSwitch(beat.still_exclusive === 1)
    setSelectedMoods((beat.moods ?? []).map(m => m.name))
    setSelectedGenres((beat.genres ?? []).map(g => g.name))
    setPreviewCover(beat.cover_path)
    setActiveSwitch(beat.active)
    setTaggedPath(beat.tagged_path)
    reset(beat)
    // setMp3File(beat.licenses[0])
    // setWavFile(beat.)
    // setStemsFile(beat.stems_file)
  }, [beat])

  const handleUndoCoverFile = () => {
    if (coverFileRef.current) {
      coverFileRef.current.value = ''
    }
    setCoverFile(null)
  }
  const handleUndoTaggedFile = () => {
    if (taggedFileRef.current) {
      taggedFileRef.current.value = ''
    }
    setTaggedFile(null)
  }
  const handleUndoMp3File = () => {
    if (mp3FileRef.current) {
      mp3FileRef.current.value = ''
    }
    setMp3File(null)
  }
  const handleUndoWavFile = () => {
    if (wavFileRef.current) {
      wavFileRef.current.value = ''
    }
    setWavFile(null)
  }
  const handleUndoStemsFile = () => {
    if (stemsFileRef.current) {
      stemsFileRef.current.value = ''
    }
    setStemsFile(null)
  }

  return (

    <div className='w-full'>

      <div className='w-full md:w-[70%] mx-auto flex flex-col justify-center items-center rounded-lg'>

        <form onSubmit={handleSubmit(onSubmit)} className='rounded-lg bg-white w-full'>
          <div className='flex justify-center items-center bg-zinc-900 rounded-t-lg'>
            <h2 className='text-3xl text-white font-bold px-8 py-4'>{editable ? 'Editar' : 'Ver'} beat</h2>
          </div>
          <div className='w-full p-5 rounded-blr-lg border-2 border-zinc-900'>

            <Textinput disabled={!editable} label='Nombre' type='text' placeholder='Nombre' name='name' register={register} error={errors.name} />
            <div className='flex justify-center items-center w-full gap-5 mt-5'>

              <Textinput disabled={!editable} classGroup='w-1/2' label='BPM' type='number' placeholder='BPM' name='bpm' register={register} error={errors.bpm} />
              <Textinput disabled={!editable} classGroup='w-1/2' label='Escala' type='text' placeholder='Escala' name='scale' register={register} error={errors.scale} />

            </div>
            <div className='w-full flex justify-start items-start gap-5 mt-5'>
              {editable === true &&
                <div className='w-1/2'>
                  <label htmlFor='cover_file' className='class-label block text-sm font-medium mb-2.5 pt-1'>Portada</label>
                  <input type='file' className='w-full px-5 py-2.5 border border-slate-300 rounded-md' label='Portada' ref={coverFileRef} placeholder='Portada' name='cover_file' onChange={(e) => setCoverFile(e.target.files[0])} />
                  {coverFile && <Button icon='mdi:remove' text='Eliminar portada' className='btn bg-zinc-900 text-white block w-full text-center mt-2' onClick={() => handleUndoCoverFile()} />}
                </div>}

              <div className='w-1/2'>
                <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Previsualización de la portada</span>
                <img src={(coverFile != null && URL.createObjectURL(coverFile)) || previewCover || 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'} className='w-24 h-24' />
              </div>
            </div>

            <hr className='my-5' />

            <h5 className='text-lg text-slate-900 font-medium mt-5 mb-5'>Instrumental con tag de voz</h5>
            <div className='flex justify-start items-center gap-5'>
              <div className='w-1/2 flex flex-col gap-5'>
                {editable === true &&
                  <input type='file' className='w-full px-5 py-2.5 border border-slate-300 rounded-md' label='Archivo MP3' ref={taggedFileRef} placeholder='Archivo con tag de voz' name='tagged_file' onChange={(e) => setTaggedFile(e.target.files[0])} />}
                {taggedFile && <Button icon='mdi:remove' text='Eliminar archivo' className='btn bg-zinc-900 text-white block w-full text-center mt-2' onClick={() => handleUndoTaggedFile()} />}
                <audio controls src={(taggedFile != null && URL.createObjectURL(taggedFile)) || taggedPath} />
              </div>
            </div>

            <h5 className='text-lg text-slate-900 font-medium mt-5 mb-5'>Licencia mp3</h5>
            <div className='flex flex-col md:flex-row justify-center items-start gap-5'>
              <div className='w-full md:w-1/2 flex flex-col justify-center items-start'>
                <label htmlFor='mp3_file' className='class-label block text-sm font-medium mb-2.5 pt-1'>Archivo MP3</label>
                {editable === true &&
                  <input type='file' className='w-full px-5 py-2.5 border border-slate-300 rounded-md' ref={mp3FileRef} label='Archivo MP3' placeholder='Archivo MP3' name='mp3_file' onChange={(e) => setMp3File(e.target.files[0])} />}
                {mp3File && <Button icon='mdi:remove' text='Eliminar archivo' className='btn bg-zinc-900 text-white block w-full text-center mt-2' onClick={() => handleUndoMp3File()} />}
                <Button text='Descargar' className='' icon='heroicons-outline:download' onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/beatlicense/${beat.mp3_download_key}/download`)} />
              </div>
              <div className='w-full md:w-1/2'>
                <Textinput classGroup='w-full' disabled={!editable} label='Precio (EUR)' type='number' placeholder='Precio mp3' name='mp3_price_eur' register={register} error={errors.mp3_price_eur} />
              </div>
            </div>

            <h5 className='text-lg text-slate-900 font-medium mt-5 mb-5'>Licencia wav</h5>
            <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
              <div className='w-full md:w-1/2'>
                <label htmlFor='wav_file' className='class-label block text-sm font-medium mb-2.5 pt-1'>Archivo WAV</label>
                {editable === true &&
                  <input type='file' label='Archivo WAV' ref={wavFileRef} className='w-full px-5 py-2.5 border border-slate-300 rounded-md' placeholder='Archivo WAV' name='wav_file' onChange={(e) => setWavFile(e.target.files[0])} />}
                {wavFile && <Button icon='mdi:remove' text='Eliminar archivo' className='btn bg-zinc-900 text-white block w-full text-center mt-2' onClick={() => handleUndoWavFile()} />}
                <Button text='Descargar' className='' icon='heroicons-outline:download' onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/beatlicense/${beat.wav_download_key}/download`)} />
              </div>
              <Textinput classGroup='w-full md:w-1/2' disabled={!editable} label='Precio (EUR)' type='number' placeholder='Precio wav' name='wav_price_eur' register={register} error={errors.wav_price_eur} />
            </div>

            <h5 className='text-lg text-slate-900 font-medium my-5'>Licencia stems</h5>
            <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
              <div className='w-full md:w-1/2'>
                <label htmlFor='stems_file' className='class-label block text-sm font-medium mb-2.5 pt-1'>Archivo STEMS</label>
                {editable === true &&
                  <input type='file' label='Archivo STEMS' ref={stemsFileRef} className='w-full px-5 py-2.5 border border-slate-300 rounded-md' placeholder='Archivo STEMS' name='stems_file' onChange={(e) => setStemsFile(e.target.files[0])} />}
                {stemsFile && <Button icon='mdi:remove' text='Eliminar archivo' className='btn bg-zinc-900 text-white block w-full text-center mt-2' onClick={() => handleUndoStemsFile()} />}
                <Button text='Descargar' className='' icon='heroicons-outline:download' onClick={() => window.open(`${import.meta.env.VITE_API_URL}/api/beatlicense/${beat.stems_download_key}/download`)} />
              </div>
              <Textinput classGroup='w-full md:w-1/2' disabled={!editable} label='Precio (EUR)' type='number' placeholder='Precio stems' name='stems_price_eur' register={register} error={errors.stems_price_eur} />
            </div>

            {/* <div className='flex justify-start  items-center gap-5'>
              <label className='text-lg text-slate-900 font-medium my-2'>Exclusivo</label>
              <input type='checkbox' disabled={!editable} checked={exclusiveSwitch} switch onChange={() => setExclusiveSwitch(!exclusiveSwitch)} label='Exclusivo' />
            </div>

            {exclusiveSwitch ==== true && (
              <div className='flex justify-start items-center gap-5'>
                <Textinput classGroup='w-1/2' disabled={!editable} label='Precio' type='number' placeholder='Precio' name='exclusive_price' register={register} error={errors.exclusive_price} />
              </div>
            )} */}
            <hr className='my-5' />
            <Textinput disabled={!editable} classGroup='w-1/2' label='Número de copias' type='number' placeholder='Número de copias' name='stock' register={register} error={errors.stock} />

            <div className='mt-5'>
              <CustomSelector name='Moods' disabled={!editable} values={moods} setSelected={setSelectedMoods} selected={selectedMoods} />
            </div>

            <div className='mt-5'>
              <CustomSelector disabled={!editable} name='Géneros' values={genres} setSelected={setSelectedGenres} selected={selectedGenres} />
            </div>

            <div className='mt-5'>
              <Switch
                disabled={!editable}
                activeClass='bg-primary-500'
                value={activeSwitch}
                onChange={() => { setActiveSwitch(!activeSwitch) }}
                label='Activo'
              />
            </div>

            {editable && (
              <div className='flex justify-center items-center mt-5'>
                <Button text='Guardar' className='bg-primary-500 text-white duration-300 w-full' onClick={handleSubmit(onSubmit)} />
              </div>
            )}

            {updatedProgress > 0 && (
              <div className='mt-5'>
                <ProgressBar value={updatedProgress} />
              </div>
            )}

          </div>

        </form>
      </div>
    </div>

  )
}

export default ShowBeatForm
