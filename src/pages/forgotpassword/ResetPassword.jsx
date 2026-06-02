import React from 'react'
import { Link, Navigate, useOutletContext } from 'react-router-dom'
import NewPasswordForm from './components/new-password-form'
import useDarkMode from '@/hooks/useDarkMode'

import LogoWhite from '@/assets/images/logo/logo-white.svg'
import Logo from '@/assets/images/logo/logo.svg'
import Illustration from '@/assets/images/auth/ils1.svg'
const ResetPassword = () => {
  const [isDark] = useDarkMode()
  const { isAuthenticated, sendNewPassword } = useOutletContext()

  if (isAuthenticated()) {
    return <Navigate to='/' />
  } else {
    return (
      <div className='loginwrapper'>
        <div className='lg-inner-column'>
          <div className='left-column relative z-[1]'>
            <div className='max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20'>
              <Link to='/'>
                <img src={isDark ? LogoWhite : Logo} alt='' className='mb-10' />
              </Link>

              <h4>
                Bienvenido a {' '}
                <span className='text-slate-800 dark:text-slate-400 font-bold'>
                  Lambda Beats
                </span>
              </h4>
            </div>
            <div className='absolute left-0 bottom-[-130px] h-full w-full z-[-1]'>
              <img
                src={Illustration}
                alt=''
                className='h-full w-full object-contain'
              />
            </div>
          </div>
          <div className='right-column relative'>
            <div className='inner-content h-full flex flex-col bg-white dark:bg-slate-800'>
              <div className='auth-box2 flex flex-col justify-center h-full'>
                <div className='mobile-logo text-center mb-6 lg:hidden block'>
                  <Link to='/'>
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=''
                      className='mx-auto'
                    />
                  </Link>
                </div>
                <div className='text-center 2xl:mb-10 mb-5'>
                  <h4 className='font-medium mb-4'>Restablece tu contraseña</h4>
                </div>
                <NewPasswordForm sendNewPassword={sendNewPassword} />
                <div className='md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm'>
                  Olvídalo,
                  <Link
                    to='/login'
                    className='text-slate-900 dark:text-white font-medium hover:underline'
                  >
                    Llévame
                  </Link>
                  al login
                </div>
              </div>
              <div className='auth-footer text-center'>
                Lambda Beats 2024, Todos los Derechos Reservados
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ResetPassword
