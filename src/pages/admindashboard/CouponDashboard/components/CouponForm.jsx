import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Textinput from '@/components/ui/Textinput'
import Select from '@/components/ui/Select'
import Switch from '@/components/ui/Switch'
import useCoupons from '@/hooks/useCoupons'
import axios from 'axios'

const TYPE_OPTIONS = [
  { value: 'percentage', label: 'Porcentaje (%)' },
  { value: 'fixed', label: 'Fijo (€ / $)' },
  { value: 'two_for_one', label: '2x1 — El más barato gratis' }
]

function CouponForm ({ AxiosPrivate, coupon }) {
  const isEdit = !!coupon
  const navigate = useNavigate()
  const { createCoupon, updateCoupon } = useCoupons({ AxiosPrivate })
  const [active, setActive] = useState(coupon ? !!coupon.active : true)
  const [firstPurchaseOnly, setFirstPurchaseOnly] = useState(coupon ? !!coupon.first_purchase_only : false)
  const [licenses, setLicenses] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/license`)
      .then(res => setLicenses(res.data))
      .catch(() => {})
  }, [])

  const licenseOptions = [
    { value: '__all__', label: 'Sin restricción (todas)' },
    ...licenses.map(l => ({ value: String(l.id), label: l.name }))
  ]

  const { register, handleSubmit, watch } = useForm({
    defaultValues: coupon
      ? {
          code: coupon.code,
          type: coupon.type,
          value: coupon.value ?? '',
          fixed_value_eur: coupon.fixed_value_eur ?? '',
          fixed_value_usd: coupon.fixed_value_usd ?? '',
          max_uses: coupon.max_uses ?? '',
          expires_at: coupon.expires_at ? coupon.expires_at.substring(0, 10) : '',
          license_id: coupon.license_id ? String(coupon.license_id) : '__all__'
        }
      : { type: '', license_id: '__all__' }
  })

  const type = watch('type')

  const onSubmit = (data) => {
    const payload = {
      code: data.code,
      type: data.type,
      active: active ? 1 : 0,
      first_purchase_only: firstPurchaseOnly ? 1 : 0,
      value: data.value !== '' ? data.value : null,
      fixed_value_eur: data.fixed_value_eur !== '' ? data.fixed_value_eur : null,
      fixed_value_usd: data.fixed_value_usd !== '' ? data.fixed_value_usd : null,
      max_uses: data.max_uses !== '' ? data.max_uses : null,
      expires_at: data.expires_at !== '' ? data.expires_at : null,
      license_id: (data.license_id && data.license_id !== '__all__') ? data.license_id : null
    }

    const action = isEdit
      ? updateCoupon(coupon.id, payload)
      : createCoupon(payload)

    action.then(() => {
      navigate('/dashboard/coupons')
    }).catch(() => {})
  }

  return (
    <div className='w-full'>
      <div className='w-[70%] mx-auto'>
        <h2 className='text-3xl text-slate-900 font-bold mb-8'>
          {isEdit ? 'Editar cupón' : 'Nuevo cupón'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <Textinput
            label='Código'
            placeholder='EJEMPLO20'
            name='code'
            register={register}
          />

          <Select
            label='Tipo'
            name='type'
            register={register}
            options={TYPE_OPTIONS}
            placeholder='Selecciona un tipo'
          />

          {type === 'percentage' && (
            <Textinput
              label='Descuento (%)'
              type='number'
              placeholder='20'
              name='value'
              register={register}
            />
          )}

          {type === 'fixed' && (
            <div className='flex gap-4'>
              <div className='flex-1'>
                <Textinput
                  label='Descuento (€)'
                  type='number'
                  placeholder='5.00'
                  name='fixed_value_eur'
                  register={register}
                />
              </div>
              <div className='flex-1'>
                <Textinput
                  label='Descuento ($)'
                  type='number'
                  placeholder='5.50'
                  name='fixed_value_usd'
                  register={register}
                />
              </div>
            </div>
          )}

          <Select
            label='Restringir a licencia (opcional)'
            name='license_id'
            register={register}
            options={licenseOptions}
            placeholder='Todas las licencias'
          />

          <Textinput
            label='Máximo de usos (opcional)'
            type='number'
            placeholder='Sin límite'
            name='max_uses'
            register={register}
          />

          <Textinput
            label='Fecha de caducidad (opcional)'
            type='date'
            name='expires_at'
            register={register}
          />

          <Switch
            label='Solo primera compra'
            activeClass='bg-primary-500'
            value={firstPurchaseOnly}
            onChange={() => setFirstPurchaseOnly(!firstPurchaseOnly)}
          />

          <Switch
            label='Activo'
            activeClass='bg-primary-500'
            value={active}
            onChange={() => setActive(!active)}
          />

          <div className='flex gap-3 pt-2'>
            <Button type='submit' className='btn-dark'>
              {isEdit ? 'Guardar cambios' : 'Crear cupón'}
            </Button>
            <Button
              type='button'
              className='btn-outline-dark'
              onClick={() => navigate('/dashboard/coupons')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CouponForm
