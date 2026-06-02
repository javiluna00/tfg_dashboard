import React, { useState } from 'react'
import HorizentalMenu from './Tools/HorizentalMenu'
import useWidth from '@/hooks/useWidth'
import MobileMenu from './Tools/MobileMenu'
import Profile from './Tools/Profile'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Logo from './Tools/Logo'
import { Icon } from '@iconify/react'

const Header = ({ className = 'custom-class', isAuthenticated, isAdmin, auth }) => {
  const { width } = useWidth()

  const navigate = useNavigate()

  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <header className='h-[6vh] sticky top-0 z-[999]'>
      <div className='h-full app-header md:px-6 px-[15px]  dark:bg-slate-800 shadow-base dark:shadow-base3 bg-zinc-900 border-b border-zinc-800'>
        <div className='flex justify-between items-center h-full'>
          <div className='basis-1/3 sm:basis-1/6 flex justify-start items-center'>
            <Logo />
            {width < '867' && <div
              className='cursor-pointer text-slate-900 dark:text-amber-50 text-2xl'
              onClick={() => setMobileMenu(!mobileMenu)}
                              >
              <Icon icon='heroicons-outline:menu-alt-3' className='text-red-500' />
            </div>}

          </div>
          <div className='flex items-center justify-center basis-4/6'>

            {width >= '867'
              ? (
                <HorizentalMenu />
                )
              : (<MobileMenu open={mobileMenu} setOpen={setMobileMenu} />)}

          </div>
          <div className='basis-2/4 md:basis-1/4 nav-tools flex justify-center items-center lg:space-x-6 space-x-3 rtl:space-x-reverse'>
            {isAdmin() === true

              ? <Link to='/dashboard'><Button className='h-8 w-full bg-red-500 text-amber-50 flex items-center' color='light' icon='heroicons:arrow-left-20-solid'>Dashboard</Button></Link>

              : <></>}
{isAuthenticated() === true

              ? <Profile user={auth.user} />

              : <button className='btn btn-primary btn-sm bg-amber-50 text-zinc-950' onClick={(e) => navigate('/login')}>Iniciar sesión</button>}
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
