import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
const schema = yup
  .object({
    email: yup.string().email('Email incorrecto').required('El email es requerido')
  })
  .required()
const ForgotPass = ({ sendForgotPassword }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    sendForgotPassword(data).then((res) => {
      console.log('res : ', res)

      if (res.err) {
        toast.error(res.err.message)
        reset()
      }
      if (res.message) {
        toast.success(res.message)
        reset()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 '>
      <Textinput
        name='email'
        placeholder='example@example.com'
        label='email'
        type='email'
        register={register}
        error={errors.email}
        className='h-[48px]'
      />

      <button className='btn btn-dark block w-full text-center'>
        Enviar email de recuperación
      </button>
    </form>
  )
}

export default ForgotPass
