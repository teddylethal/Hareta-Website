import { Dialog, Transition } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { Fragment, useContext } from 'react'
import { ThemeContext } from 'src/App'
import likeItemAPi from 'src/apis/userLikeItem.api'

interface Props {
  isOpen: boolean
  handleClose: () => void
  unlikeItemId: string
  setUnlikeItemId: React.Dispatch<React.SetStateAction<string>>
}

export default function UnlikeItemDialog({ isOpen, handleClose, unlikeItemId, setUnlikeItemId }: Props) {
  const { theme } = useContext(ThemeContext)
  const queryClient = useQueryClient()
  const unlikeItemMutation = useMutation(likeItemAPi.unlikeItem)
  const unlikeItem = () => {
    unlikeItemMutation.mutate(
      { item_id: unlikeItemId as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['favourite_list'] })
        }
      }
    )
    setUnlikeItemId('')
    handleClose()
  }
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
              <Dialog.Panel
                className={classNames(
                  'w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all dark:bg-black',
                  {
                    'bg-black': theme === 'dark',
                    'bg-white': theme === 'light'
                  }
                )}
              >
                <Dialog.Title
                  as='h3'
                  className={classNames('text-xl font-medium leading-6 text-gray-900', {
                    'text-textLight': theme === 'dark',
                    'text-textDark': theme === 'light'
                  })}
                >
                  Remove this item from your favourite list?
                </Dialog.Title>

                <div className='mt-8 flex justify-between'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={unlikeItem}
                  >
                    Remove
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
