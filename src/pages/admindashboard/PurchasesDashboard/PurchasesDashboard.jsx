import ReactTable from '@/components/partials/reacttable/ReactTable'
import SkeletionTable from '@/components/skeleton/Table'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'
import usePurchases from '@/hooks/usePurchases'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function PurchasesDashboard () {
  const { AxiosPrivate } = useOutletContext()
  const { purchases, isLoading, getPurchasesFromAPI, resendEmail } = usePurchases(AxiosPrivate)

  const navigate = useNavigate()

  const COLUMNS = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (row) => {
        return <span>{row.getValue()}</span>
      }
    },
    {
      header: 'Beat',
      cell: ({ row }) => {
        return (
          <div className='flex justify-start items-center'>
            <img
              src={row.original.beat?.cover_path}
              className='w-12 h-12 object-cover rounded-sm'
            />
            <div className='flex flex-col justify-center ml-3 gap-1'>
              <span
                className='font-bold uppercase cursor-pointer hover:underline'
                onClick={() => row.original.beat?.slug && navigate(`/dashboard/beats/show/${row.original.beat.slug}`)}
              >
                {row.original.beat?.name}
              </span>
              <span>{row.original.license?.name}</span>
            </div>
          </div>
        )
      }
    },
    {
      header: 'Email',
      cell: ({ row }) => {
        const userRegistered = !!row.original.user
        const handleEmailClick = () => {
          if (userRegistered) {
            navigate(`/dashboard/users/${row.original.user.id}`)
          }
        }

        return (
          <span
            className={`uppercase ${userRegistered && 'cursor-pointer hover:underline'}`}
            onClick={handleEmailClick}
          >
            {row.original.email}
          </span>
        )
      }
    },
    {
      header: 'Precio',
      accessorKey: 'price',
      cell: (row) => {
        return <span>{row.getValue()}€</span>
      }
    },
    {
      header: 'Cupón',
      cell: ({ row }) =>
        row.original.coupon_code
          ? <span className='font-mono text-xs bg-slate-100 px-2 py-1 rounded'>{row.original.coupon_code}</span>
          : <span className='text-slate-400'>—</span>
    },
    {
      header: 'Tipo',
      cell: ({ row }) => row.original.user
        ? (
          <span className='inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full'>
            <span>●</span> Cuenta
          </span>
          )
        : (
          <span className='inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full'>
            <span>○</span> Invitado
          </span>
          )
    },
    {
      header: 'Fecha de compra',
      accessorFn: ({ created_at: createdAt }) => new Date(createdAt).getTime(),
      cell: ({ getValue }) => dayjs(getValue()).format('DD-MM-YYYY HH:mm:ss')
    },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <Button
          text='Reenviar email'
          className='btn btn-dark btn-sm bg-zinc-800 text-xs whitespace-nowrap'
          onClick={() => resendEmail(row.original.id)}
        />
      )
    }
  ]

  useEffect(() => {
    getPurchasesFromAPI()
  }, [])

  return (
    <div className='w-full h-full py-10 bg-slate-50 min-h-screen'>

      <div className='container'>

        <div>
          <Breadcrumbs />
        </div>

        <div className='mt-10'>
          {isLoading && <SkeletionTable />}
          {!isLoading && <ReactTable name='Ventas' columns={COLUMNS} data={purchases} />}
        </div>

      </div>

    </div>
  )
}

export default PurchasesDashboard
