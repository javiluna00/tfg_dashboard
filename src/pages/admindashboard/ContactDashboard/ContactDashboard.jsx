import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import SkeletionTable from '@/components/skeleton/Table'
import useContact from '@/hooks/useContact'
import ReactTable from '@/components/partials/reacttable/ReactTable'
import Tooltip from '@/components/ui/Tooltip'
import { useNavigate } from 'react-router-dom'

function ContactDashboard () {
  const navigate = useNavigate()

  const actions = [
    {
      name: 'Ver',
      icon: 'heroicons-outline:eye',
      link: '/dashboard/contacts/show/:id'
    }
    // {
    //   name: 'Marcar como no leído',
    //   icon: 'heroicons-outline:eye-slash'
    // }
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
      accessorKey: 'name'
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Nombre artístico',
      accessorFn: ({ artistic_name }) => artistic_name || '-'
    },
    {
      header: 'Asunto',
      accessorKey: 'subject',
      cell: (row) => {
        return <span className='text-blue-500 cursor-pointer hover:underline font-bold'>{row.getValue()}</span>
      }
    },
    {
      header: 'Leído',
      accessorKey: 'read',
      cell: (row) => {
        console.log('Row : ', row.getValue())
        if (row.getValue() == 0) {
          return <span className='text-danger-500'>No</span>
        } else {
          return <span className='text-success-500'>Si</span>
        }
      }
    },
    {
      header: 'Fecha',
      accessorKey: 'created_at',
      cell: (row) => {
        return <span>{dayjs(row.getValue()).format('DD/MM/YYYY')}</span>
      }
    },
    {
      header: 'Acciones',
      cell: (row) => {
        return (
          <div className='flex justify-center items-center divide-y divide-slate-100 dark:divide-slate-800 gap-2'>
            {actions.map((item, i) => (
              <Tooltip key={i} content={item.name}>
                <div
                  className='cursor-pointer hover:text-red-500 dark:hover:bg-slate-800'
                >
                  <span className='text-base' onClick={() => navigate(item.link.replace(':id', row.row.original.id))}>
                    <Icon icon={item.icon} fontSize={20} />
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        )
      }
    }
  ]

  const { contacts, getContacts, isLoading } = useContact()

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <div className='w-full h-full py-10 bg-slate-50'>

      <div className='container min-h-[85vh]'>

        <div>
          <Breadcrumbs />
        </div>

        {isLoading && <SkeletionTable />}
        {!isLoading && <ReactTable columns={COLUMNS} data={contacts} />}

      </div>

    </div>
  )
}

export default ContactDashboard
