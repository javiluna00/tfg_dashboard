import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'

const schema = yup
  .object({
    password: yup.string().required('La contraseña es requerida'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
  })
  .required()
const NewPasswordForm = ({ sendNewPassword }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const onSubmit = (data) => {
    if (!searchParams.get('token')) {
      toast.error('No se encontro el token')
      return
    }
    const formData = {
      password: data.password,
      passwordConfirmation: data.confirmPassword,
      reset_password_token: searchParams.get('token')
    }

    sendNewPassword({ token: formData.reset_password_token, password: formData.password, passwordConfirmation: formData.passwordConfirmation }).then((res) => {
      if (res.err) {
        toast.error(res.err.message)
        reset()
      }
      if (res.message) {
        toast.success(res.message)
        navigate('/login')
        reset()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 '>
      <Textinput
        name='password'
        placeholder='*********'
        label='Contraseña'
        type='password'
        register={register}
        error={errors.password}
        className='h-[48px]'
      />
      <Textinput
        name='confirmPassword'
        placeholder='********'
        label='Confirmar contraseña'
        type='password'
        register={register}
        error={errors.confirmPassword}
        className='h-[48px]'
      />

      <button className='btn btn-dark block w-full text-center'>
        Enviar nueva contraseña
      </button>
    </form>
  )
}

export default NewPasswordForm
