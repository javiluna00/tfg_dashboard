import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@/components/ui/Button'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const schema = yup
  .object({
    email: yup.string().email('Email incorrecto').required('Email requerido'),
    password: yup.string().required('Contraseña requerida')
  })
  .required()
const LoginForm = ({ logIn, isAuthenticated, isLoading }) => {
  if (isAuthenticated()) {
    return null
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: 'all'
  })

  const onSubmit = (data) => {
    console.log('Data : ', data)
    logIn({ email: data.email, password: data.password }).then((res) => {
      if (res.error) {
        toast.error(res.error)
      }
      if (res.message) {
        toast.success(res.message)
      }
    }).catch((error) => {
      console.log('Error : ', error)
      toast.error(error.error)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 '>
      <Textinput
        name='email'
        label='Email'
        type='email'
        placeholder='example@example.com'
        register={register}
        error={errors.email}
        className='h-[48px]'
      />
      <Textinput
        name='password'
        label='Contraseña'
        type='password'
        placeholder='**********'
        register={register}
        error={errors.password}
        hasicon
        className='h-[48px]'
      />
      <div className='flex justify-between'>
        {/* <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Mantener sesión iniciada"
        /> */}
        <Link
          to='/forgot-password'
          className='text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium'
        >
          ¿Olvidaste tu contraseña?{' '}
        </Link>
      </div>

      <Button
        type='submit'
        text='Iniciar sesión'
        className='btn btn-dark block w-full text-center '
        isLoading={isLoading}
      />
    </form>
  )
}

export default LoginForm
