import React from 'react'
import Google from '@/assets/images/icon/gp.svg'
import { Link } from 'react-router-dom'

const Social = () => {
  return (
    <ul className='w-full flex justify-center items-center'>
      <li className='flex justify-center items-center w-full'>
        <Link
          to='/login'
          className='inline-flex h-10 w-10 bg-[#EA4335] text-white text-2xl flex-col items-center justify-center rounded-full'
        >
          <img src={Google} alt='Logo de Google' />
        </Link>
      </li>
    </ul>
  )
}

export default Social
