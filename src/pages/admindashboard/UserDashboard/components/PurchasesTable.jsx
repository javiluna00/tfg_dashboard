import ReactTable from '@/components/partials/reacttable/ReactTable'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LICENSE_COLORS = {
  MP3: 'bg-blue-100 text-blue-700',
  WAV: 'bg-purple-100 text-purple-700',
  STEMS: 'bg-green-100 text-green-700',
}

function PurchasesTable ({ userPurchases }) {
  const navigate = useNavigate()

  const COLUMNS = [
    {
      header: 'Beat',
      cell: ({ row }) => {
        const { beat, licenseName, beatSlug } = row.original
        const badgeClass = LICENSE_COLORS[licenseName?.toUpperCase()] ?? 'bg-slate-100 text-slate-600'
        return (
          <div className='flex items-center gap-3'>
            {beat.cover_url
              ? <img src={beat.cover_url} className='w-12 h-12 rounded object-cover flex-shrink-0' />
              : <div className='w-12 h-12 rounded bg-zinc-200 flex-shrink-0' />}
            <div className='flex flex-col gap-1'>
              <span
                className={`font-semibold text-slate-800 ${beatSlug ? 'hover:underline cursor-pointer' : ''}`}
                onClick={() => beatSlug && navigate('/dashboard/beats/show/' + beatSlug)}
              >
                {beat.name}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit ${badgeClass}`}>
                {licenseName}
              </span>
            </div>
          </div>
        )
      }
    },
    {
      header: 'Precio',
      cell: ({ row }) => (
        <span className='font-semibold text-slate-700'>{row.original.price} €</span>
      )
    },
    {
      header: 'Fecha',
      cell: ({ row }) => (
        <span className='text-slate-500 text-sm whitespace-nowrap'>{row.original.createdAt}</span>
      )
    },
    {
      id: 'action',
      header: '',
      cell: ({ row }) => {
        const { beatSlug } = row.original
        return beatSlug
          ? (
            <button
              className='text-xs text-primary-500 hover:underline whitespace-nowrap'
              onClick={() => navigate('/dashboard/beats/show/' + beatSlug)}
            >
              Ver beat →
            </button>
            )
          : null
      }
    }
  ]

  if (!userPurchases || userPurchases.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-slate-400 bg-white rounded-lg'>
        <span className='text-sm font-medium'>Sin compras registradas</span>
      </div>
    )
  }

  return (
    <div className='rounded-lg overflow-hidden'>
      <ReactTable name='Compras' data={userPurchases} columns={COLUMNS} />
    </div>
  )
}

export default PurchasesTable
