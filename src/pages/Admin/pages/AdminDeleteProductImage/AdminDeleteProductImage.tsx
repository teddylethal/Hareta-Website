import { useContext, useState } from 'react'
import AdminDialog from '../../components/AdminDialog'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import AdminSelectsVariant from '../../components/AdminSelectsVariant'
import { AdminContext } from 'src/contexts/admin.context'
import DialogPopup from 'src/components/DialogPopup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminProductImageApi } from 'src/apis/admin.api'
import { AppContext } from 'src/contexts/app.context'
import AdminProductImageHeader from '../AdminProductImagePage/AdminProductImageHeader'
import AdminProductGroupList from '../../components/AdminProductGroupList'
import AdminProductImageList from '../../components/AdminProductImageList'

export default function AdminDeleteProductImage() {
  const { currentProduct, currentImage, setCurrentImage } = useContext(AdminContext)
  const { setLoadingPage } = useContext(AppContext)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [dialog, setDialog] = useState(false)

  //? HANDLE DELETE
  const queryClient = useQueryClient()
  const onClickDelete = () => {
    setConfirmDialog(true)
  }

  const deleteItemImageMutation = useMutation({ mutationFn: adminProductImageApi.deleteImage })
  const handleDelete = () => {
    setConfirmDialog(false)
    setLoadingPage(true)
    deleteItemImageMutation.mutate(
      { id: currentImage?.id as string },
      {
        onSuccess: () => {
          showSuccessDialog(setDialog)
          queryClient.invalidateQueries({ queryKey: ['admin_product_image_list'] })
          setCurrentImage(null)
        }
      }
    )
    setLoadingPage(false)
  }

  return (
    <div>
      <AdminProductImageHeader />
      <div className='mt-4 grid grid-cols-2 gap-8'>
        <div className='col-span-1'>
          <div className='space-y-8'>
            <AdminProductGroupList />
            <AdminSelectsVariant />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='space-y-8'>
            <AdminProductImageList />
            <div className='space-y-4 rounded-lg border border-white/40 bg-black p-4'>
              <div className='grid grid-cols-3 gap-4'>
                <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Tên</p>
                <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentProduct?.name}</p>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Màu</p>
                <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentProduct?.color}</p>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <p className='col-span-1 text-lg font-medium uppercase text-white/60'>ID hình ảnh</p>
                <p className='col-span-2 text-lg capitalize text-haretaColor'>{currentImage?.id}</p>
              </div>
              {currentImage && (
                <div className='flex w-full items-center justify-end'>
                  <button
                    className='lg:text-sm rounded-lg bg-alertRed/80 px-3 py-1 text-xs uppercase hover:bg-alertRed'
                    onClick={onClickDelete}
                  >
                    Xóa
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
        classNameWrapper='relative w-80 max-w-md transform overflow-hidden rounded-2xl p-10 align-middle shadow-xl transition-all'
      >
        <p className='text-center text-xl font-semibold uppercase leading-6'>Xóa ảnh này?</p>
        <div className='mt-8 flex justify-between'>
          <button
            type='button'
            className='flex items-center justify-center rounded-md bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200'
            onClick={() => setConfirmDialog(false)}
          >
            Hủy
          </button>
          <button
            type='button'
            className='flex items-center justify-center rounded-md bg-alertRed/80 px-4 py-1 text-sm font-medium hover:bg-alertRed'
            onClick={handleDelete}
          >
            Xóa
          </button>
        </div>
      </DialogPopup>
    </div>
  )
}
