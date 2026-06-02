import SkeletionTable from '@/components/skeleton/Table'
import Button from '@/components/ui/Button'
import useUsers from '@/pages/admindashboard/UserDashboard/hooks/useUsers'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import CustomSelector from '../../BeatDashboard/components/CustomSelector'
import ProgressBar from '@/components/ui/ProgressBar'
import dayjs from 'dayjs'
import PurchasesTable from './PurchasesTable'

function ShowUserForm ({ editable = false, AxiosPrivate }) {
  const { id } = useParams()

  const { getOneUser, loading, setLoading, getAllRoles, updateUser, updatedProgress } = useUsers({ AxiosPrivate })
  const [user, setUser] = useState({})
  const [allRoles, setAllRoles] = useState([])
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [selectedRoles, setSelectedRoles] = useState([])
  useEffect(() => {
    setLoading(true)
    getOneUser(id).then((res) => {
      const { purchases } = res
      const formattedPurchases = purchases
        .filter(p => p.beat && p.license)
        .map(({ id, license, beat, price, created_at, updated_at }) => ({
          id,
          beatId: beat.id,
          beatSlug: beat.slug,
          licenseId: license.id,
          beat: { name: beat.name, cover_url: beat.cover_path },
          licenseName: license.name,
          price,
          createdAt: dayjs(created_at).format('DD-MM-YYYY HH:mm:ss'),
          updatedAt: dayjs(updated_at).format('DD-MM-YYYY HH:mm:ss')
        }))
      setUser({ ...res, purchases: formattedPurchases })
      setSelectedRoles(res.roles.map(role => role.name))
      reset(res)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
    })

    getAllRoles().then((res) => {
      setAllRoles(res)
    })
  }, [])

  useEffect(() => {
    if (user) {
      console.log(user)
    }
  }, [user])

  const RenderUserInfo = () => {
    return (
      <div className='w-full flex flex-col justify-center items-center gap-5 bg-white rounded p-5'>
        <h3 className='text-xl font-semibold text-zinc-900'>Información básica</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full flex justify-center items-center gap-5'>
            <div className='w-full flex flex-col justify-start items-start gap-5 mt-5'>
              <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Nombre</span>
              <input type='text' className='w-full bg-zinc-100 px-5 py-3 rounded border border-zinc-300 focus:border-primary-500 focus:outline-none cursor-not-allowed' disabled label='Nombre' placeholder='Nombre del usuario' name='name' defaultValue={user.name} />
              <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Nombre artístico</span>
              <input type='text' className='w-full bg-zinc-100 px-5 py-3 rounded border border-zinc-300 focus:border-primary-500 focus:outline-none cursor-not-allowed' disabled label='Nombre artístico' placeholder='Nombre artístico' name='artistic_name' defaultValue={user.artist_name ? user.artist_name : ''} />
              <span className='class-label block text-sm font-medium mb-2.5 pt-1'>E-mail</span>
              <input type='text' className='w-full bg-zinc-100 px-5 py-3 rounded border border-zinc-300 focus:border-primary-500 focus:outline-none cursor-not-allowed' disabled label='Email' placeholder='Email' name='email' defaultValue={user.email} />
              <div className='flex justify-center items-center gap-5'>

                {selectedRoles && <CustomSelector disabled={!editable} name='roles' values={allRoles} selected={selectedRoles} setSelected={setSelectedRoles} />}

              </div>

            </div>
          </div>

          {editable && <Button type='submit' text='Guardar' className='btn-primary w-full mt-5' />}
        </form>

        {editable && <ProgressBar className='mt-5' autoClose={false} progress={updatedProgress} />}

      </div>
    )
  }

  const onSubmit = (data) => {
    updateUser(user.id, { roles: selectedRoles })
  }

  if (loading) {
    return <div><SkeletionTable /></div>
  }
  return (
    <div className='w-full p-5 bg-zinc-900 rounded-lg'>
      <h2 className='text-3xl text-white font-bold p-5'>{editable ? 'Editar' : 'Ver'} usuario</h2>
      <div className='w-full mx-auto flex md:flex-row flex-col justify-center items-start gap-10 p-5'>
        <div className='w-full md:w-1/3'>
          {loading
            ? <SkeletionTable />
            : <RenderUserInfo />}
        </div>
        <div className='w-full md:w-2/3'>
          <h3 className='text-lg text-white font-semibold mb-3'>Historial de compras</h3>
          {loading
            ? <SkeletionTable />
            : <PurchasesTable userPurchases={user.purchases} />}
        </div>
      </div>
    </div>
  )
}

export default ShowUserForm
