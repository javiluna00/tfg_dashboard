import React from 'react'
import useDarkMode from '@/hooks/useDarkMode'
import { Link } from 'react-router-dom'
import useWidth from '@/hooks/useWidth'
import logolambda from '@/assets/videos/home/logolambda.mp4'
import logotransparente from '@/assets/images/login/logo-transparente.png'

const Logo = () => {
  return (
    <div>
      <Link to='/'>
        <img className='ml-2 w-8 h-8 object-cover ' src={logotransparente} />
        {/* <video className='w-14 h-14 object-cover mix-blend-screen ' loop autoPlay muted src={logolambda} /> */}
      </Link>
    </div>
  )
}

export default Logo
