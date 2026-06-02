import React, { useState, useEffect } from 'react'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import Icon from '@/components/ui/Icon'

const Breadcrumbs = () => {
  const location = useLocation()
  const locationName = location.pathname.replace('/', '')
  const navigate = useNavigate()
  const [currentPath, setCurrentPath] = useState([])

  useEffect(() => {
    let currentPath = location.pathname.split('/').filter((item) => item !== '')
    
    // Si el último elemento es un número O si el penúltimo es 'show'/'edit', eliminamos los dos últimos
    const secondToLast = currentPath[currentPath.length - 2]
    if (!isNaN(currentPath[currentPath.length - 1]) || ['show', 'edit'].includes(secondToLast)) {
      currentPath = currentPath.slice(0, -2)
    }
    
    setCurrentPath(currentPath)
  }, [location, locationName])

  useEffect(() => {
    console.log('Current path', currentPath)
  }, [currentPath])

  return (
    <>
      <div className='md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse w-full rounded-lg bg-white h-10 p-2 overflow-x-auto shadow-md' style={{ scrollbarWidth: 'none' }}>
        <ul className='breadcrumbs'>
          <li className='text-primary-500'>
            <NavLink to='/dashboard' className='text-lg'>
              <Icon icon='heroicons-outline:home' />
            </NavLink>
            <span className='breadcrumbs-icon rtl:transform rtl:rotate-180'>
              <Icon icon='heroicons:chevron-right' />
            </span>
          </li>

          {currentPath.map((path, index) => (
            <li
              key={index}
              className='capitalize text-slate-500 dark:text-slate-400'
              onClick={() => navigate(`/${currentPath.slice(0, index + 1).join('/')}`)}
            >
              <button type='button' className='capitalize'>
                {path}
              </button>
              <span className='breadcrumbs-icon rtl:transform rtl:rotate-180'>
                <Icon icon='heroicons:chevron-right' />
              </span>
            </li>
          ))}

          <li>
            <span className='breadcrumbs-icon rtl:transform rtl:rotate-180 cursor-pointer text-red-500' onClick={() => navigate(-1)}>
              <Icon icon='heroicons:chevron-left' className='text-red-500' />
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Breadcrumbs
