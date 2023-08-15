import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import React, { Fragment, useContext } from 'react'
import { ThemeContext } from 'src/App'

interface Props {
  isOpen: boolean
  handleClose: () => void
  classNameWrapper?: string
  children?: React.ReactNode
}

export default function DialogPopup({
  isOpen,
  handleClose,
  classNameWrapper = 'w-60 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all bg-black/90',
  children = (
    <>
      <Dialog.Title as='h3' className='text-center text-xl font-medium leading-6 text-gray-900'>
        Added successful
      </Dialog.Title>
      <div className='mt-2  text-center'>
        <FontAwesomeIcon
          icon={faCheck}
          fontSize={36}
          className='text- rounded-full bg-black/10 p-4 text-center text-success'
        />
      </div>
    </>
  )
}: Props) {
  const { theme } = useContext(ThemeContext)
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className={classNames(classNameWrapper, {})}>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
