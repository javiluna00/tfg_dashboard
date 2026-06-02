import React from 'react'
import { Link, Navigate, useOutletContext } from 'react-router-dom'
import ForgotPass from './components/forgot-pass'
import Illustration from '@/assets/images/login/logo-transparente.png'
import Logo from '@/assets/images/logo/logo.svg'
const ForgotPassword = () => {
  const { isAuthenticated } = useOutletContext()

  const { sendForgotPassword } = useOutletContext()

  if (isAuthenticated()) {
    return <Navigate to='/' />
  } else {
    return (
      <div className='loginwrapper'>
        <div className='lg-inner-column'>
          <div className='left-column relative flex justify-center items-center z-[1]'>
            <div className='max-w-[520px] mx-auto '>
              <Link to='/'>
                <img src={Illustration} alt='' className='mb-10' />
              </Link>

              <h4>
                Bienvenido a {' '}
                <span className='text-zinc-100 dark:text-slate-400 font-bold'>
                  Lambda Beats
                </span>
              </h4>
            </div>
            {/* <div className='absolute left-0 bottom-[-130px] h-full w-full z-[-1]'>
              <img
                src={Illustration}
                alt=''
                className='h-full w-full object-contain'
              />
            </div> */}
          </div>
          <div className='right-column relative'>
            <div className='inner-content h-full flex flex-col bg-white dark:bg-slate-800'>
              <div className='auth-box2 flex flex-col justify-center h-full'>
                <div className='mobile-logo text-center mb-6 lg:hidden block'>
                  <Link to='/'>
                    <img
                      src={Illustration}
                      alt=''
                      className='mx-auto max-w-[100px] h-auto object-contain'
                    />
                  </Link>
                </div>
                <div className='text-center 2xl:mb-10 mb-5'>
                  <h4 className='font-medium mb-4'>¿Olvidaste tu contraseña?</h4>
                  <div className='text-slate-500 dark:text-slate-400 text-base'>
                    Restablece tu contraseña de forma segura
                  </div>
                </div>
                <div className='font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10'>
                  Introduce tu correo y te enviaremos un enlace para restablecerla
                </div>

                <ForgotPass sendForgotPassword={sendForgotPassword} />
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

export default ForgotPassword
