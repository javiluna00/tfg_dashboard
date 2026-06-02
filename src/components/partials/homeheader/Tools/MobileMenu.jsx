import { Dialog, Transition, Combobox } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { Link, useLocation } from 'react-router-dom'
import { topMenu } from '@/constant/data'
import Button from '@/components/ui/Button'

const MobileMenu = ({ open, setOpen }) => {
  const location = useLocation()

  const subruta = location.pathname.split('/')[1]

  function closeModal () {
    setOpen(false)
  }

  function openModal () {
    setOpen(true)
  }

  return (
    <>

      <Transition show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-[9999] overflow-y-auto p-4 md:pt-[25vh] pt-20'
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-[#000] bg-opacity-40' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel>
              <Combobox>
                <div className='relative'>
                  <div className='w-full p-5'>
                    <div className='p-5 rounded-xl shadow-md backdrop-blur-xl bg-white/30 flex flex-col items-center justify-center gap-20'>
                      {topMenu.map((item) => (
                        <div key={item.link} onClick={closeModal} className='w-full'>
                          <Link to={'/' + item.link}>

                            <div className={`mx-auto ${subruta === item.link ? 'bg-red-500 text-white' : 'bg-white text-red-500'}  p-5 rounded-xl w-[80%] flex flex-1 items-center space-x-[6px] rtl:space-x-reverse`}>
                              <span className='icon-box text-2xl duration-300'>
                                <Icon icon={item.icon} />
                              </span>
                              <span className='w-full text-center text-xl '>{item.title}</span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileMenu
