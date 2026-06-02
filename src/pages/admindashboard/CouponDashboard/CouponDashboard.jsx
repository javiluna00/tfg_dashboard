import ReactTable from '@/components/partials/reacttable/ReactTable'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import useCoupons from '@/hooks/useCoupons'
import React, { useEffect } from 'react'
import SkeletionTable from '@/components/skeleton/Table'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Tooltip from '@/components/ui/Tooltip'
import { useNavigate, useOutletContext } from 'react-router-dom'

const TYPE_LABELS = {
  percentage: 'Porcentaje',
  fixed: 'Fijo',
  two_for_one: '2x1'
}

const TYPE_COLORS = {
  percentage: 'bg-blue-100 text-blue-700',
  fixed: 'bg-green-100 text-green-700',
  two_for_one: 'bg-red-100 text-red-700'
}

function CouponDashboard () {
  const { AxiosPrivate } = useOutletContext()
  const { coupons, isLoading, getAllCoupons, deleteCoupon, updateCoupon } = useCoupons({ AxiosPrivate })
  const navigate = useNavigate()

  const COLUMNS = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (row) => <span>{row.getValue()}</span>
    },
    {
      header: 'Código',
      accessorKey: 'code',
      cell: (row) => (
        <span className='font-bold font-mono tracking-widest'>{row.getValue()}</span>
      )
    },
    {
      header: 'Tipo',
      accessorKey: 'type',
      cell: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-bold ${TYPE_COLORS[row.getValue()] ?? ''}`}>
          {TYPE_LABELS[row.getValue()] ?? row.getValue()}
        </span>
      )
    },
    {
      header: 'Valor',
      cell: ({ row }) => {
        const { type, value, fixed_value_eur, fixed_value_usd } = row.original
        if (type === 'percentage') return <span>{value}%</span>
        if (type === 'fixed') return <span>{fixed_value_eur}€ / ${fixed_value_usd}</span>
        return <span className='text-slate-400'>—</span>
      }
    },
    {
      header: 'Usos',
      cell: ({ row }) => {
        const { used_count, max_uses } = row.original
        return (
          <span>
            {used_count ?? 0}
            {max_uses ? ` / ${max_uses}` : ''}
          </span>
        )
      }
    },
    {
      header: 'Restricciones',
      cell: ({ row }) => {
        const { license_id, first_purchase_only } = row.original
        const tags = []
        if (license_id) tags.push({ label: `Licencia #${license_id}`, color: 'bg-purple-100 text-purple-700' })
        if (first_purchase_only) tags.push({ label: '1ª compra', color: 'bg-amber-100 text-amber-700' })
        if (tags.length === 0) return <span className='text-slate-400'>—</span>
        return (
          <div className='flex flex-wrap gap-1'>
            {tags.map(t => (
              <span key={t.label} className={`px-2 py-0.5 rounded text-xs font-bold ${t.color}`}>{t.label}</span>
            ))}
          </div>
        )
      }
    },
    {
      header: 'Caduca',
      cell: ({ row }) =>
        row.original.expires_at
          ? dayjs(row.original.expires_at).format('DD-MM-YYYY')
          : <span className='text-slate-400'>Sin caducidad</span>
    },
    {
      header: 'Activo',
      cell: (row) => {
        const [active, setActive] = React.useState(!!row.row.original.active)
        return (
          <Switch
            activeClass='bg-primary-500'
            value={active}
            onChange={() => {
              const next = !active
              setActive(next)
              updateCoupon(row.row.original.id, { active: next ? 1 : 0 })
            }}
          />
        )
      }
    },
    {
      header: 'Acciones',
      cell: (row) => (
        <div className='flex items-center gap-1'>
          <Tooltip content='Editar'>
            <div
              className='cursor-pointer hover:text-primary-500 px-2 py-1'
              onClick={() =>
                navigate('/dashboard/coupons/edit/' + row.row.original.id, {
                  state: row.row.original
                })
              }
            >
              <Icon icon='heroicons:pencil-square' fontSize={20} />
            </div>
          </Tooltip>

          <Tooltip content='Eliminar'>
            <Modal
              title='¿Seguro que quieres eliminar este cupón?'
              icon='heroicons-outline:trash'
              centered
              className='hover:text-red-500'
              uncontrol
            >
              <div className='flex justify-center gap-10'>
                <Button text='Cancelar' className='btn-outline-dark' />
                <Button
                  text='Eliminar'
                  className='btn-danger'
                  onClick={() => deleteCoupon(row.row.original.id)}
                />
              </div>
            </Modal>
          </Tooltip>
        </div>
      )
    }
  ]

  useEffect(() => {
    getAllCoupons()
  }, [])

  return (
    <div className='w-full h-full py-10 bg-slate-50 min-h-screen'>
      <div className='container'>
        <Breadcrumbs />

        <div className='mt-10 shadow-md'>
          {isLoading
            ? <SkeletionTable />
            : <ReactTable
                name='Cupones'
                columns={COLUMNS}
                data={coupons}
                hasNewButton
                newEntityUrl='/dashboard/coupons/new'
              />}
        </div>
      </div>
    </div>
  )
}

export default CouponDashboard
