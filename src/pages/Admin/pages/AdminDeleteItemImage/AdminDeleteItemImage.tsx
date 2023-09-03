import { useContext, useState } from 'react'
import AdminDialog from '../../components/AdminDialog'
import AdminImagesPage from '../AdminImagesPage'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import AdminItemGroup from '../../components/AdminItemGroup'
import AdminItemsInGroup from '../../components/AdminItemsInGroup'
import AdminItemImages from '../../components/AdminItemImages'
import { AdminContext } from '../../layouts/AdminLayout/AdminLayout'
import DialogPopup from 'src/components/DialogPopup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminItemImageApi } from 'src/apis/admin.api'
import { AppContext } from 'src/contexts/app.context'

export default function AdminDeleteItemImage() {
  const { setPageIsLoading } = useContext(AppContext)
  const { currentItem, currentImage, setCurrentImage } = useContext(AdminContext)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [dialog, setDialog] = useState(false)

  //? HANDLE DELETE
  const queryClient = useQueryClient()
  const onClickDelete = () => {
    setConfirmDialog(true)
  }

  const deleteItemImageMutation = useMutation(adminItemImageApi.deleteImage)
  const handleDelete = () => {
    setConfirmDialog(false)
    setPageIsLoading(true)
    deleteItemImageMutation.mutate(
      { id: currentImage?.id as string },
      {
        onSuccess: () => {
          showSuccessDialog(setDialog)
          queryClient.invalidateQueries({ queryKey: ['item_image_list'] })
          setCurrentImage(null)
        }
      }
    )
    setPageIsLoading(false)
  }

  return (
    <div>
      <AdminImagesPage />
      <div className='mt-12 grid grid-cols-2 gap-8'>
        <div className='col-span-1'>
          <div className='space-y-8'>
            <AdminItemGroup />
            <AdminItemsInGroup />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='space-y-8'>
            <AdminItemImages />
            <div className='space-y-4 rounded-lg border border-white/40 bg-black p-4'>
              <div className='grid grid-cols-3 gap-4'>
                <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Item name</p>
                <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.name}</p>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Color</p>
                <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentItem?.color}</p>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Image ID</p>
                <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentImage?.id}</p>
              </div>
              {currentImage && (
                <div className='flex w-full items-center justify-end'>
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
        </div>
      </div>
      <AdminDialog isOpen={dialog} setIsOpen={setDialog} content='Image was deleted' />
      <DialogPopup
        isOpen={confirmDialog}
        handleClose={() => {
          setConfirmDialog(false)
        }}
      >
        <p className='text-center text-xl font-semibold uppercase leading-6'>Are you sure to delete this image?</p>
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
    </div>
  )
}
