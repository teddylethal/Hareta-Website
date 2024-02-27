import { useContext, useState } from 'react'
import AdminDeletePageHeader from '../../components/AdminDeletePageHeader'
import AdminItemGroup from '../../components/AdminItemGroup'
import AdminItemsInGroup from '../../components/AdminItemsInGroup'
import { AdminContext } from '../../layouts/AdminLayout/AdminLayout'
import ItemTag from 'src/constants/itemTag'
import DialogPopup from 'src/components/DialogPopup'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminItemApi } from 'src/apis/admin.api'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import AdminDialog from '../../components/AdminDialog'

export default function AdminDeleteItem() {
  const { currentItem, setCurrentItem } = useContext(AdminContext)
  const { setLoadingPage } = useContext(AppContext)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [dialog, setDialog] = useState(false)

  //? HANDLE DELETE
  const queryClient = useQueryClient()
  const onClickDelete = () => {
    setConfirmDialog(true)
  }

  const deleteItemMutation = useMutation(adminItemApi.deleteItem)
  const handleDelete = () => {
    setConfirmDialog(false)
    setLoadingPage(true)
    deleteItemMutation.mutate(
      { id: currentItem?.id as string },
      {
        onSuccess: () => {
          showSuccessDialog(setDialog)
          queryClient.invalidateQueries({ queryKey: ['items_in_group'] })
          queryClient.invalidateQueries({ queryKey: ['item_groups'] })
          setCurrentItem(null)
        }
      }
    )
    setLoadingPage(false)
  }

  return (
    <div>
      <AdminDeletePageHeader />
      <div className='mt-8 grid grid-cols-2 gap-8'>
        <div className='col-span-1'>
          <div className='sticky top-6 space-y-8'>
            <AdminItemGroup />
            <AdminItemsInGroup />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='relative space-y-4 overflow-hidden rounded-lg border border-white/40 p-4'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Image</p>
              <div className='col-span-2'>
                <div className='relative w-full pt-[75%]'>
                  <img
                    src={currentItem?.avatar?.url || ''}
                    alt={`${currentItem?.name} ${currentItem?.color}`}
                    className='absolute left-0 top-0 h-full w-full object-scale-down'
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>group name</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.group?.name}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Item name</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.name}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>price</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.price}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Color</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.color}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>category</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.category}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>collection</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.collection}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>type</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.type}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>product line</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.product_line}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>quantity</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.quantity}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>tag</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{ItemTag[currentItem?.tag || 0]}</p>
            </div>
            {!currentItem && <div className='absolute inset-0 bg-black'></div>}
          </div>
          {currentItem && (
            <div className='mt-4 flex w-full items-center justify-end'>
              <button
                className='rounded-lg bg-red-600/80 px-3 py-1 text-xs uppercase hover:bg-red-600 lg:text-sm'
                onClick={onClickDelete}
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
      <DialogPopup
        isOpen={confirmDialog}
        handleClose={() => {
          setConfirmDialog(false)
        }}
      >
        <p className='text-center text-xl font-semibold uppercase leading-6'>Are you sure to delete this item?</p>
        <div className='mt-8 flex justify-between'>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            onClick={() => setConfirmDialog(false)}
          >
            Cancel
          </button>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </DialogPopup>
      <AdminDialog isOpen={dialog} setIsOpen={setDialog} content='Item was deleted' />
    </div>
  )
}
