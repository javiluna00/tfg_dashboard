import ReactTable from '@/components/partials/reacttable/ReactTable'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import useUsers from '@/pages/admindashboard/UserDashboard/hooks/useUsers'
import React, { useEffect } from 'react'
import SkeletionTable from '@/components/skeleton/Table'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Tooltip from '@/components/ui/Tooltip'

function UserDashboard () {
  const navigate = useNavigate()

  const actions = [
    {
      name: 'Ver',
      icon: 'heroicons-outline:eye',
      link: '/dashboard/users/:id'
    },
    {
      name: 'Editar',
      icon: 'heroicons:pencil-square',
      link: '/dashboard/users/edit/:id'
    }
  ]

  const COLUMNS = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (row) => {
        return <span>{row.getValue()}</span>
      }
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
      cell: (row) => {
        return <span className='font-bold'>{row.getValue()}</span>
      }
    },
    {
      header: 'Nombre artístico',
      accessorFn: ({ artist_name }) => artist_name || '-'
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Roles',
      accessorKey: 'roles',
      cell: (row) => {
        return (
          <div>
            {row.getValue().map((role, index) => (
              <span key={index}>{role.name}{index < row.getValue().length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        )
      }
    },
    {
      header: 'Tipo de cuenta',
      accessorFn: ({ google_id }) => google_id ? 'Cuenta de google' : 'Cuenta de usuario'
    },
    {
      header: 'Fecha de registro',
      accessorFn: ({ created_at }) => dayjs(created_at).format('DD-MM-YYYY HH:mm:ss')
    },

    {
      header: 'Acciones',
      cell: (row) => {
        return (
          <div className='flex justify-start items-center gap-5'>
            {actions.map((action, index) => (
              <Tooltip key={index} content={action.name}>
                <div
                  className='cursor-pointer hover:text-red-500 dark:hover:bg-slate-800'
                >
                  <span className='text-base'>
                    <Icon key={index} icon={action.icon} className='text-slate-600 cursor-pointer hover:text-red-500 duration-150' fontSize={20} onClick={() => navigate(action.link.replace(':id', row.row.original.id))} />
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        )
      }
    }
  ]

  const { AxiosPrivate } = useOutletContext()
  const { users, getAllUsers, loading } = useUsers({ AxiosPrivate })

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className='w-full h-full py-10 bg-slate-50 min-h-screen'>

      <div className='container'>

        <div>
          <Breadcrumbs />
        </div>

        {loading
          ? <SkeletionTable />
          : <div className='mt-10'>
            <ReactTable name='Usuarios' columns={COLUMNS} data={users} />
            </div>}

      </div>

    </div>
  )
}

export default UserDashboard
