import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Logo from '@/assets/images/logo/logo.svg'
import Illustration from '@/assets/images/login/logo-transparente.png'
import LoginForm from './components/login-form'
import Social from './components/social'
import Textinput from '@/components/ui/Textinput'
import Button from '@/components/ui/Button'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  // const {isAuthenticated, endGoogleLogin} = useAuthBien()

  const { isAuthenticated, googleLogin, endGoogleLogin, logIn, isLoading } = useOutletContext()

  const [artistNameSection, setArtistNameSection] = useState(false)
  const [withArtistName, setWithArtistName] = useState(true)

  const [tempGoogleInfo, setTempGoogleInfo] = useState({})
  const [tempAccessToken, setTempAccessToken] = useState('')

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard')
    }
  }, [isAuthenticated(), navigate])

  const schema = yup
    .object({
      artist_name: yup.string()
    })
    .required()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: 'all'
  })

  const onSubmitArtistName = (data) => {
    try {
      let artistName

      if (!withArtistName) {
        artistName = null
      } else {
        artistName = data.artist_name
      }
      endGoogleLogin(tempAccessToken, tempGoogleInfo, artistName)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const setActiveArtistNameSection = (resGoogle, accessToken) => {
    setArtistNameSection(true)

    const { id, ...resGoogleWithoutId } = resGoogle.data

    const resGoogleFormatted = {
      ...resGoogleWithoutId,
      googleId: id
    }

    setTempGoogleInfo(resGoogleFormatted)
    setTempAccessToken(accessToken)
  }

  return (
    <div className='loginwrapper'>
      <div className='lg-inner-column'>
        <div className='left-column relative z-[1]'>
          <div className='absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]'>
            <img
              src={Illustration}
              alt=''
              className='w-1/2 h-auto mx-auto object-contain'
            />
          </div>
        </div>
        <div className='right-column relative'>

          <div className='inner-content h-full flex flex-col bg-white dark:bg-slate-800'>

            {artistNameSection === false ? 
            <div className='auth-box h-full flex flex-col justify-center'>
              <div className='mobile-logo text-center mb-6 lg:hidden block'>
                <Link to='/'>
                  <img
                    src={Logo}
                    alt=''
                    className='mx-auto'
                  />
                </Link>
              </div>
              <div className='text-center 2xl:mb-10 mb-4'>
                <h4 className='font-medium'>Iniciar sesión</h4>
                <div className='text-slate-500 text-base' />
              </div>
              <LoginForm logIn={logIn} isLoading={isLoading} isAuthenticated={isAuthenticated} />

            </div>
              : <div className='auth-box h-full flex flex-col justify-center'>
                <div className='mobile-logo text-center mb-6 lg:hidden block'>
                  <Link to='/'>
                    <img
                      src={Logo}
                      alt=''
                      className='mx-auto'
                    />
                  </Link>
                </div>

                <div className='text-center 2xl:mb-10 mb-4'>
                  <h4 className='font-medium'>Completa tu registro</h4>
                  <div className='text-slate-500 text-base' />
                </div>

                <form onSubmit={handleSubmit(onSubmitArtistName)} className='space-y-4 '>
                  <Textinput
                    name='artist_name'
                    label='Nombre artístico'
                    type='text'
                    placeholder='Nombre artístico'
                    register={register}
                    error={errors.artist_name}
                    className='h-[48px]'
                  />
                  <div className='flex justify-between'>
                    <Button type='submit' text='Terminar sin nombre artístico' className='bg-transparent text-slate-500 block w-full text-center hover:text-slate-700 duration-300' onClick={() => setWithArtistName(false)} />
                    <Button
                      type='submit'
                      text='Enviar'
                      className='btn btn-dark block w-full text-center '
                    />

                  </div>
                </form>
                </div>}
            <div className='auth-footer text-center'>
              © 2024 Lambda Beats. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
