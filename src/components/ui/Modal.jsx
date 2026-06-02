import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Icon from '@/components/ui/Icon'

const Modal = ({
  disabled = false,
  activeModal,
  setActiveModal,
  onClose,
  noFade,
  disableBackdrop,
  className = 'max-w-3xl',
  children,
  icon,
  footerContent,
  centered,
  scrollContent,
  themeClass = 'bg-zinc-800 border-b border-zinc-700',
  title = 'Basic Modal',
  uncontrol,
  label,
  labelClass,
  ref
}) => {
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }

  const openModal = () => {
    if(uncontrol)
      setShowModal(!showModal)
    else
      setActiveModal(!activeModal)
  }
  const returnNull = () => {
    return null
  }

  return (
    <>
      {uncontrol
        ? (
          <>
            <button
              disabled={disabled}
              type='button'
              onClick={openModal}
              className={`btn ${labelClass} ${disabled ? 'cursor-not-allowed' : ''}`}
            >
              <div className='flex items-center justify-center gap-4'>
                {icon && <Icon icon={icon} />}
                {label}
              </div>

            </button>
            <Transition appear show={showModal} as={Fragment}>
              <Dialog
                as='div'
                className='relative z-[99999]'
                onClose={!disableBackdrop ? closeModal : returnNull}
              >
                {!disableBackdrop && (
                  <Transition.Child
                    as={Fragment}
                    enter={noFade ? '' : 'duration-300 ease-out'}
                    enterFrom={noFade ? '' : 'opacity-0'}
                    enterTo={noFade ? '' : 'opacity-100'}
                    leave={noFade ? '' : 'duration-200 ease-in'}
                    leaveFrom={noFade ? '' : 'opacity-100'}
                    leaveTo={noFade ? '' : 'opacity-0'}
                  >
                    <div className='fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm' />
                  </Transition.Child>
                )}

                <div className='fixed inset-0 overflow-y-auto'>
                  <div
                    className={`flex min-h-full justify-center text-center p-6 ${
                    centered ? 'items-center' : 'items-start '
                  }`}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter={noFade ? '' : 'duration-300  ease-out'}
                      enterFrom={noFade ? '' : 'opacity-0 scale-95'}
                      enterTo={noFade ? '' : 'opacity-100 scale-100'}
                      leave={noFade ? '' : 'duration-200 ease-in'}
                      leaveFrom={noFade ? '' : 'opacity-100 scale-100'}
                      leaveTo={noFade ? '' : 'opacity-0 scale-95'}
                    >
                      <Dialog.Panel
                        className={`w-full transform overflow-hidden rounded-md
                 bg-amber-50 text-left align-middle shadow-xl transition-alll ${className}`}
                      >
                        <div
                          className={`relative overflow-hidden py-4 px-5 text-white flex justify-between  ${themeClass}`}
                        >
                          <h2 className='leading-6 tracking-wider font-medium text-base text-white'>
                            {title}
                          </h2>
                          <button onClick={closeModal} className='text-[22px]'>
                            <Icon icon='heroicons-outline:x' />
                          </button>
                        </div>
                        <div
                          className={`px-6 py-8 ${
                          scrollContent ? 'overflow-y-auto max-h-[400px]' : ''
                        }`}
                        >
                          {children}
                        </div>
                        {footerContent && (
                          <div className='px-4 py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700'>
                            {footerContent}
                          </div>
                        )}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
          )
        : (
          <>
            <button
              disabled={disabled}
              type='button'
              onClick={openModal}
              className={`btn ${labelClass} ${disabled ? 'cursor-not-allowed' : ''}`}
            >
            <div className='flex items-center justify-center gap-4'>
              {icon && <Icon icon={icon} />}
              {label}
            </div>

            </button>
          <Transition appear show={activeModal} as={Fragment}>
            <Dialog as='div' className='relative z-[99999]' onClose={onClose}>
              <Transition.Child
                as={Fragment}
                enter={noFade ? '' : 'duration-300 ease-out'}
                enterFrom={noFade ? '' : 'opacity-0'}
                enterTo={noFade ? '' : 'opacity-100'}
                leave={noFade ? '' : 'duration-200 ease-in'}
                leaveFrom={noFade ? '' : 'opacity-100'}
                leaveTo={noFade ? '' : 'opacity-0'}
              >
                {!disableBackdrop && (
                  <div className='fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm' />
                )}
              </Transition.Child>

              <div className='fixed inset-0 overflow-y-auto'>
                <div
                  className={`flex min-h-full justify-center text-center p-6 ${
                  centered ? 'items-center' : 'items-start '
                }`}
                >
                  <Transition.Child
                    as={Fragment}
                    enter={noFade ? '' : 'duration-300  ease-out'}
                    enterFrom={noFade ? '' : 'opacity-0 scale-95'}
                    enterTo={noFade ? '' : 'opacity-100 scale-100'}
                    leave={noFade ? '' : 'duration-200 ease-in'}
                    leaveFrom={noFade ? '' : 'opacity-100 scale-100'}
                    leaveTo={noFade ? '' : 'opacity-0 scale-95'}
                  >
                    <Dialog.Panel
                      className={`w-full transform overflow-hidden rounded-md
                  bg-amber-50  text-left align-middle shadow-xl transition-alll ${className}`}
                    >
                      <div
                        className={`relative overflow-hidden py-4 px-5 text-white flex justify-between ${themeClass}`}
                      >
                        <h2 className='leading-6 tracking-widest font-medium text-base text-white text-sm uppercase'>
                          {title}
                        </h2>
                        <button onClick={onClose} className='text-[22px]'>
                          <Icon icon='heroicons-outline:x' />
                        </button>
                      </div>
                      <div
                        className={`px-6 py-8 ${
                        scrollContent ? 'overflow-y-auto max-h-[400px]' : ''
                      }`}
                      >
                        {children}
                      </div>
                      {footerContent && (
                        <div className='px-4 py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700'>
                          {footerContent}
                        </div>
                      )}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          </>
          )}
    </>
  )
}

export default Modal
