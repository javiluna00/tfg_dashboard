import React, { useEffect } from 'react'
import Card from '@/components/ui/Card'
import ImageBlock2 from './components/image-block-2'
import GroupChart2 from './components/group-chart-2'
import RevenueBarChart from './components/revenue-bar-chart'

import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import useStatystics from '@/hooks/useStatystics'
import SkeletionTable from '@/components/skeleton/Table'

const Admindashboard = () => {
  const { loadStatysticsFromAPI, statistics, isLoading } = useStatystics()

  useEffect(() => {
    loadStatysticsFromAPI()
  }, [])

  return (
    <div className='bg-slate-50 p-10 min-h-[90vh]'>

      <h4 className='font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-10'>
        Panel de administrador
      </h4>

      <div className='grid grid-cols-12 gap-5 mb-5'>
        <div className='2xl:col-span-3 lg:col-span-4 col-span-12'>
          <ImageBlock2 />
        </div>
        {isLoading && <SkeletionTable />}
        {!isLoading && Object.entries(statistics).length > 0 &&
          <div className='2xl:col-span-9 lg:col-span-8 col-span-12'>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
              <GroupChart2 statistics={statistics} />
            </div>
          </div>}

      </div>

      <div className='w-full'>
        <Card title='Bancos' className='w-full'>
          <Button className='' icon='logos:stripe' onClick={() => window.open('https://dashboard.stripe.com/', '_blank')} />
        </Card>
      </div>

      <Card title='Acciones' className='w-full'>
        <div className='grid md:grid-cols-5 grid-cols-1 gap-5 mb-5'>
          <Link to='/dashboard/beats'><Button className='h-16 w-full bg-red-500 text-white flex items-center' color='light' icon='heroicons:arrow-left-20-solid'>Beats</Button></Link>
          <Link to='/dashboard/purchases'><Button className='h-16 w-full bg-red-500 text-white flex items-center' color='light' icon='heroicons:arrow-left-20-solid'>Ventas</Button></Link>
          <Link to='/dashboard/projects'><Button className='h-16 w-full bg-red-500 text-white flex items-center' color='light' icon='heroicons:arrow-left-20-solid'>Proyectos</Button></Link>
          <Link to='/dashboard/contacts'><Button className='h-16 w-full bg-red-500 text-white flex items-center' color='light' icon='heroicons:arrow-left-20-solid'>Contacto</Button></Link>
          <Link to='/dashboard/users'><Button className='h-16 w-full bg-red-500 text-white flex items-center' color='light' icon='heroicons:arrow-left-20-solid'>Usuarios</Button></Link>
          <Link to='/dashboard/coupons'><Button className='h-16 w-full bg-violet-600 text-white flex items-center' color='light' icon='heroicons:arrow-left-20-solid'>Cupones</Button></Link>
          <Link to='/dashboard/analytics'><Button className='h-16 w-full bg-emerald-600 text-white flex items-center' color='light' icon='heroicons:chart-bar-20-solid'>Player Analytics</Button></Link>
        </div>
      </Card>
      <div className='flex justify-center items-center gap-5'>
        {isLoading && <SkeletionTable />}
        {!isLoading && Object.entries(statistics).length > 0 &&
          <div className='w-full'>
            <Card title='Ingresos' className='w-full'>
              <div className='legend-ring'>
                <RevenueBarChart height={420} statistics={statistics} />
              </div>
            </Card>
          </div>}
      </div>
    </div>
  )
}

export default Admindashboard
