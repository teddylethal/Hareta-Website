import { Fragment, useContext, useState } from 'react'
import AdminDeletePageHeader from '../../components/AdminDeletePageHeader'
import AdminProductGroup from '../../components/AdminProductGroup'
import AdminSelectsVariant from '../../components/AdminSelectsVariant'
import { AdminContext } from 'src/contexts/admin.context'
import DialogPopup from 'src/components/DialogPopup'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminProductApi } from 'src/apis/admin.api'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import AdminDialog from '../../components/AdminDialog'
import { formatDate } from 'src/utils/utils'

function InforSection({ title, infor, isDate = false }: { title: string; infor: string | number; isDate?: boolean }) {
  //! STYLES
  const wrapperClassname = 'grid grid-cols-3 text-sm items-center gap-4'
  const titleWrapperClassname = 'col-span-1'
  const contentWrapperClassname = 'col-span-2'
  const titleClassname = 'font-medium uppercase text-white/60'
  const contentClassname = 'rounded-lg bg-darkColor900 px-2 py-1 capitalize text-haretaColor'

  return (
    <div className={wrapperClassname}>
      <div className={titleWrapperClassname}>
        <p className={titleClassname}>{title}</p>
      </div>
      <div className={contentWrapperClassname}>
        <div className={contentClassname}>{isDate ? formatDate(infor as string) : infor}</div>
      </div>
    </div>
  )
}

export default function AdminDeleteProduct() {
  const { currentProduct, setCurrentProduct } = useContext(AdminContext)
  const { setLoadingPage } = useContext(AppContext)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [dialog, setDialog] = useState(false)

  //? HANDLE DELETE
  const queryClient = useQueryClient()
  const onClickDelete = () => {
    setConfirmDialog(true)
  }

  const deleteItemMutation = useMutation({ mutationFn: adminProductApi.deleteProduct })
  const handleDelete = () => {
    setConfirmDialog(false)
    setLoadingPage(true)
    deleteItemMutation.mutate(
      { id: currentProduct?.id as string },
      {
        onSuccess: () => {
          showSuccessDialog(setDialog)
          queryClient.invalidateQueries({ queryKey: ['admin_products_in_group'] })
          queryClient.invalidateQueries({ queryKey: ['admin_default_prouduct_list'] })
          setCurrentProduct(null)
        }
      }
    )
    setLoadingPage(false)
  }

  return (
    <div>
      <AdminDeletePageHeader />
      <div className='mt-4 grid grid-cols-2 gap-8'>
        <div className='col-span-1'>
          <div className='sticky top-6 space-y-4'>
            <AdminProductGroup />
            <AdminSelectsVariant />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='relative min-h-screen space-y-4 rounded-lg border border-white/40 p-4'>
            {!currentProduct && (
              <div className='flex h-20 items-center justify-center text-lg font-semibold text-alertRed'>
                Chọn 1 sản phẩm
              </div>
            )}
            {currentProduct && (
              <Fragment>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <p className='col-span-1 text-sm font-medium uppercase text-white/60'>Ảnh đại diện</p>
                  <div className='col-span-2'>
                    <div className='relative w-full pt-[75%]'>
                      <img
                        src={currentProduct.avatar?.url || ''}
                        alt={`${currentProduct.name} ${currentProduct.color}`}
                        className='absolute left-0 top-0 h-full w-full object-scale-down'
                      />
                    </div>
                  </div>
                </div>

                <InforSection title='Nhóm sản phẩm' infor={currentProduct.group.name} />
                <InforSection title='ID' infor={currentProduct.id} />
                <InforSection title='Tên sản phẩm' infor={currentProduct.name} />
                <InforSection title='Màu' infor={currentProduct.color} />
                <InforSection title='Hạng mục' infor={currentProduct.category} />
                <InforSection title='Bộ sưu tập' infor={currentProduct.collection} />
                <InforSection title='Loại' infor={currentProduct.type} />
                <InforSection title='Dòng sản phẩm' infor={currentProduct.product_line} />
                <InforSection title='Số lượng' infor={currentProduct.quantity} />
                <InforSection title='Giá' infor={currentProduct.price} />
                <InforSection title='Giảm giá' infor={currentProduct.discount} />
                <InforSection title='Tag' infor={currentProduct.tag} />
                <InforSection title='Lượt thích' infor={currentProduct.like_count} />
                <InforSection title='Đã bán' infor={currentProduct.sold} />
                <InforSection title='cron status' infor={currentProduct.cron_status} />
                <InforSection title='Ngày tạo' infor={currentProduct.created_at} isDate />
                <InforSection title='Ngày chỉnh sửa' infor={currentProduct.updated_at} isDate />
              </Fragment>
            )}
          </div>
          {currentProduct && (
            <div className='mt-4 flex w-full items-center justify-end'>
              <button
                className='lg:text-sm rounded-lg bg-red-600/80 px-3 py-1 text-xs uppercase hover:bg-red-600'
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
