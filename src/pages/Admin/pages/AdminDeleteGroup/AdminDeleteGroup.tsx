import { Fragment, useContext, useState } from 'react'
import AdminDeletePageHeader from '../../components/AdminDeletePageHeader'
import { AdminContext } from 'src/contexts/admin.context'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import productApi from 'src/apis/product.api'
import { ProductsInGroupConfig } from 'src/types/product.type'
import DialogPopup from 'src/components/DialogPopup'
import AdminDialog from '../../components/AdminDialog'
import AdminVariantList from '../../components/AdminVariantList'
import DOMPurify from 'dompurify'
import { adminProductGroupApi } from 'src/apis/admin.api'
import AdminProductGroupList from '../../components/AdminProductGroupList'
import AdminInforSection from '../../components/AdminInforSection'
import LoadingSection from 'src/components/LoadingSection'

export default function AdminDeleteGroup() {
  const { productGroup, setProductGroup } = useContext(AdminContext)
  const { setLoadingPage } = useContext(AppContext)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [dialog, setDialog] = useState(false)

  //! GET DEFAULT PRODUCT DETAIL
  const productsInGroupQuery: ProductsInGroupConfig = {
    id: productGroup?.id as string,
    page: '1',
    limit: '50'
  }
  const { data: productsInGroupData } = useQuery({
    queryKey: ['admin_products_in_group', productsInGroupQuery],
    queryFn: () => productApi.getProductsInGroup(productsInGroupQuery),
    enabled: Boolean(productGroup),
    staleTime: 1000 * 60 * 3
  })
  const productsInGroup = productsInGroupData?.data.data || []
  const defaultProduct = productsInGroup.find((product) => product.default === true)

  const defaultProductID = defaultProduct?.id
  const { data: productDetailData, isFetching } = useQuery({
    queryKey: ['admin_default_product', defaultProductID],
    queryFn: () => productApi.getProductDetail(defaultProductID as string),

    staleTime: 3 * 60 * 1000,
    enabled: Boolean(defaultProduct)
  })
  const productDetail = productDetailData?.data.data

  //! HANDLE DELETE
  const queryClient = useQueryClient()
  const onClickDelete = () => {
    setConfirmDialog(true)
  }

  const deleteItemMutation = useMutation({ mutationFn: adminProductGroupApi.deleteProductGroup })
  const handleDelete = () => {
    setConfirmDialog(false)
    setLoadingPage(true)
    deleteItemMutation.mutate(
      { id: productGroup?.id as string },
      {
        onSuccess: () => {
          showSuccessDialog(setDialog)
          queryClient.invalidateQueries({ queryKey: ['admin_product_group_list'] })
          queryClient.invalidateQueries({ queryKey: ['admin_default_product_list'] })
          queryClient.invalidateQueries({ queryKey: ['admin_prouducts_in_group'] })
          setProductGroup(null)
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
            <AdminProductGroupList />
            <AdminVariantList />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='relative min-h-screen space-y-4 rounded-lg border border-white/40 p-4'>
            {!productGroup && (
              <div className='flex h-20 items-center justify-center text-lg font-semibold uppercase text-alertRed'>
                Chọn 1 nhóm sản phẩm
              </div>
            )}
            {isFetching && <LoadingSection />}
            {productDetail && (
              <Fragment>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <p className='col-span-1 text-sm font-medium uppercase text-white/60'>Ảnh đại diện</p>
                  <div className='col-span-2'>
                    <div className='relative w-full pt-[75%]'>
                      <img
                        src={productDetail.avatar?.url || ''}
                        alt={`${productDetail.name} ${productDetail.color}`}
                        className='absolute left-0 top-0 h-full w-full object-scale-down'
                      />
                    </div>
                  </div>
                </div>

                <AdminInforSection title='Nhóm sản phẩm' infor={productDetail.group.name} />
                <AdminInforSection title='ID' infor={productDetail.id} />
                <AdminInforSection title='Tên sản phẩm' infor={productDetail.name} />
                <AdminInforSection title='Màu' infor={productDetail.color} />
                <AdminInforSection title='Hạng mục' infor={productDetail.category} />
                <AdminInforSection title='Bộ sưu tập' infor={productDetail.collection} />
                <AdminInforSection title='Loại' infor={productDetail.type} />
                <AdminInforSection title='Dòng sản phẩm' infor={productDetail.product_line} />
                <AdminInforSection title='Số lượng' infor={productDetail.quantity} />
                <AdminInforSection title='Giá' infor={productDetail.price} />
                <AdminInforSection title='Giảm giá' infor={productDetail.discount} />
                <AdminInforSection title='Tag' infor={productDetail.tag} />
                <AdminInforSection title='Lượt thích' infor={productDetail.like_count} />
                <AdminInforSection title='Đã bán' infor={productDetail.sold} />
                <AdminInforSection title='cron status' infor={productDetail.cron_status} />
                <AdminInforSection title='Ngày tạo' infor={productDetail.created_at} isDate />
                <AdminInforSection title='Ngày chỉnh sửa' infor={productDetail.updated_at} isDate />
                <div className='gap-4'>
                  <p className='text-sm font-medium uppercase text-white/60'>Mô tả sản phẩm</p>
                  <div
                    className='text-sm capitalize'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(productDetail.description)
                    }}
                  />
                </div>
              </Fragment>
            )}
          </div>
          {productGroup && (
            <div className='mt-4 flex w-full items-center justify-end'>
              <button
                className='rounded-lg bg-red-600/80 px-3 py-1 text-xs uppercase hover:bg-red-600 desktop:text-sm'
                onClick={onClickDelete}
              >
                Xóa
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
        <div className='w-96'>
          <p className='text-center text-3xl font-bold uppercase leading-6 text-alertRed'>Dangerous deletion</p>

          <p className='mt-6 text-center text-xl font-medium uppercase'>
            Xóa một nhóm sản phẩm sẽ xóa tất cả các sản phẩm trong nhóm
          </p>

          <p className='mt-8 text-center text-lg font-medium leading-6'>Bạn có chắc muốn xóa nhóm sản phẩm này?</p>
          <div className='mt-4 flex justify-between'>
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
        </div>
      </DialogPopup>
      <AdminDialog isOpen={dialog} setIsOpen={setDialog} content='Đã xóa nhóm sản phẩm' />
    </div>
  )
}
