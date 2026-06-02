import React from 'react'
import Google from '@/assets/images/icon/gp.svg'
import { useGoogleLogin } from '@react-oauth/google'

const Social = ({ activeArtistName, googleLogin }) => {
  const errorMessage = (error) => {
    console.log(error)
  }

  const login = useGoogleLogin({
    onSuccess: async (responseMessage) => {
      const registered = await googleLogin(responseMessage.access_token)

      console.log('Registered vale : ', registered)

      if (registered.message === 'not registered') {
        activeArtistName(registered.resGoogle, registered.access_token)
      }
    },
    onError: errorMessage
  })

  return (
    <ul className='flex justify-center items-center'>
      <li className='flex justify-center items-center'>
        <div
          className='inline-flex h-10 w-10 bg-[#EA4335] text-white text-2xl flex-col items-center justify-center rounded-full cursor-pointer'
          onClick={login}
        >
          <img src={Google} alt='Logo de Google' />
        </div>
      </li>
    </ul>
  )
}

export default Social
