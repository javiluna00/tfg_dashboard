import React, { useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import RegForm from './common/reg-from'
import Logo from '@/assets/images/logo/logo.svg'
import Illustration from '@/assets/images/login/logo-transparente.png'
import Social from './common/social'

const Register = () => {
  const { isAuthenticated, register, isLoading } = useOutletContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  }, [isAuthenticated(), navigate])

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
        <div className='right-column relative bg-white dark:bg-slate-800'>
          <div className='inner-content h-full flex flex-col bg-white dark:bg-slate-800'>
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
              <div className='text-center 2xl:mb-10 mb-5'>
                <h4 className='font-medium'>Registrarse</h4>
              </div>
              <RegForm register={register} isLoading={isLoading} />
              <div className=' relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6'>
                <div className=' absolute inline-block  bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal '>
                  O continua con
                </div>
              </div>
              <div className='max-w-[242px] mx-auto mt-8 w-full'>
                <Social />
              </div>
              <div className='max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm'>
                ¿Ya estás registrado?
                <Link
                  to='/login'
                  className='text-slate-900 dark:text-white font-medium hover:underline'
                >
                  <br />
                  <div className='flex items-center justify-center space-x-1'>Inicia sesión</div>
                </Link>
              </div>
            </div>
            <div className='auth-footer text-center'>
              Copyright 2024, Lambda Beats Todos los derechos reservados
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
