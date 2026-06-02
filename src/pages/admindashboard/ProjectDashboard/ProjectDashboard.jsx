import ReactTable from '@/components/partials/reacttable/ReactTable'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import useProjects from '@/hooks/useProjects'
import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Switch from '@/components/ui/Switch'
import SkeletionTable from '@/components/skeleton/Table'
import Tooltip from '@/components/ui/Tooltip'

function ProjectDashboard () {
  const { AxiosPrivate } = useOutletContext()
  const { projects, updateProject, deleteProject, getAllProjects, isLoading } = useProjects({ AxiosPrivate })
  const navigate = useNavigate()

  const handleDeleteProject = (e, row) => {
    deleteProject(row.row.original.id)
  }

  const actions = [
    {
      name: 'Ver',
      icon: 'heroicons-outline:eye',
      link: '/dashboard/projects/show/'
    },
    {
      name: 'Editar',
      icon: 'heroicons:pencil-square',
      link: '/dashboard/projects/edit/'
    },
    {
      name: 'Eliminar',
      icon: 'heroicons-outline:trash'
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
      header: 'Descripción',
      accessorFn: ({ description }) => description.length > 30 ? description.substring(0, 30) + '...' : description
    },
    {
      header: 'Fecha de actualización',
      accessorFn: ({ updated_at }) => dayjs(updated_at).format('DD-MM-YYYY HH:mm:ss')
    },
    {
      header: 'Visible',
      cell: (row) => {
        const [activeSwitch, setActiveSwitch] = React.useState(row.row.original.active)

        return (
          <Switch
            activeClass='bg-primary-500'
            value={activeSwitch}
            onChange={() => {
              setActiveSwitch(!activeSwitch)
              updateProject(row.row.original.id, { active: activeSwitch ? 0 : 1 })
            }}
          />
        )
      }
    },
    {
      header: 'Acciones',
      cell: (row) => {
        return (
          <div className='flex justify-start items-center gap-5'>
            <div className='divide-y divide-slate-100 dark:divide-slate-800 flex justify-start items-center gap-1'>
              {actions.map((item, i) => (
                <Tooltip key={i} content={item.name}>
                  <div>
                    {item.name === 'Eliminar'

                      ? <Modal
                          title='¿Estas seguro de eliminar este proyecto?'
                          icon={item.icon}
                          centered
                          className='hover:text-red-500 max-w-md bg-zinc-700'
                          uncontrol
                        >
                        <div className='flex justify-center items-center gap-10'>
                          <Button text='Cancelar' className='btn-outline-dark' />
                          <Button text='Eliminar' className='btn-danger' onClick={(e) => handleDeleteProject(e, row)} />
                        </div>
                        </Modal>

                      : <div
                          style={{ zIndex: 10 }}
                          className={`
                
                  ${
                    item.name === 'Eliminar'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white'
                      : 'hover:text-red-500'
                  }
                   w-full  px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}

                          onClick={() => navigate(item.link + row.row.original.id)}
                        >
                        <span className='text-base'>
                          <Icon icon={item.icon} fontSize={20} />
                        </span>
                        </div>}

                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    getAllProjects()
  }, [])

  if (!projects) {
    return <div>Loading...</div>
  }
  return (
    <div className='w-full h-full py-10 bg-slate-50 min-h-screen'>

      <div className='container'>

        <div>
          <Breadcrumbs />
        </div>

        <div className='mt-10 shadow-md'>
          {isLoading && <SkeletionTable />}
          {!isLoading && <ReactTable name='Proyectos' hasNewButton newEntityUrl='/dashboard/projects/new' columns={COLUMNS} data={projects} />}
        </div>

      </div>

    </div>
  )
}

export default ProjectDashboard
