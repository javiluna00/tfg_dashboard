import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const Footer = ({ className = 'custom-class' }) => {
  return (
    <footer className={className + 'static'}>
      <div className='site-footer px-6 bg-zinc-900 text-white py-4 border-t border-red-500 py-[100px]'>
        <div className='container flex flex-col items-center justify-center'>

          <div className='w-full flex items-start justify-around p-4'>
            <div className='w-1/3 flex flex-col items-center'>
              <h3 className='text-lg font-medium text-white'>Esquema</h3>
              <div className='flex md:flex-row flex-col justify-around items-center mt-2 w-full'>
                <Link to='/'><p className='text-sm font-light cursor-pointer text-zinc-300 hover:text-white duration-200'>Feed</p></Link>
                <Link to='/mixmaster'><p className='text-sm font-normal cursor-pointer text-zinc-300 hover:text-white duration-200'>Mix & Master</p></Link>
                <Link to='/projects'><p className='text-sm font-normal cursor-pointer text-zinc-300 hover:text-white duration-200'>Proyectos</p></Link>
                <Link to='/contact'><p className='text-sm font-normal cursor-pointer text-zinc-300 hover:text-white duration-200'>Contacto</p></Link>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-medium text-white'>Social Media</h3>
              <div className='flex justify-around items-center mt-2'>
                <a href='https://www.instagram.com/lambdabeats/' target='_blank' rel='noreferrer'><Icon icon='akar-icons:instagram-fill' width='20' height='20' className='cursor-pointer' /></a>
                <a href='https://www.tiktok.com/@lambdabeats' target='_blank' rel='noreferrer'><Icon icon='akar-icons:tiktok-fill' width='20' height='20' className='cursor-pointer' /></a>
                <a href='https://www.youtube.com/@lambdabeats' target='_blank' rel='noreferrer'><Icon icon='akar-icons:youtube-fill' width='20' height='20' className='cursor-pointer' /></a>
              </div>
            </div>
          </div>

          <div className='h-px w-full bg-white' />

          <div className='w-full h-20 flex items-center justify-center p-4 gap-10'>
            <Link to='/terms'><p className='text-xs font-medium cursor-pointer'>Términos y condiciones</p></Link>
            <Link to='/cookiespolicy'><p className='text-xs font-medium cursor-pointer'>Política de cookies</p></Link>
            <Link to='/privacypolicy'><p className='text-xs font-medium cursor-pointer'>Política de privacidad</p></Link>
          </div>

          <div className='text-center ltr:md:text-start rtl:md:text-right text-sm'>
            COPYRIGHT &copy; 2024 Lambda Beats, All rights Reserved
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer
