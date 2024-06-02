import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useContext, useState } from 'react'
import eventApi from 'src/apis/event.api'
import productApi from 'src/apis/product.api'
import { AdminContext } from 'src/contexts/admin.context'
import { AppContext } from 'src/contexts/app.context'
import AdminDialog from 'src/pages/AdminPages/components/AdminDialog'
import AdminSelectProductGroup from 'src/pages/AdminPages/components/AdminSelectProductGroup'
import AdminSelectsVariant from 'src/pages/AdminPages/components/AdminSelectsVariant'

interface Props {
  eventId: string
  setIsAddingProduct: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AdminEventProducts({ eventId, setIsAddingProduct }: Props) {
  const { setLoadingPage } = useContext(AppContext)
  const { productGroup, currentProduct } = useContext(AdminContext)

  const [successDialog, setSuccessDialog] = useState(false)

  //! Get products in group
  const {
    data: productsInGroupData,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['product-groups', productGroup?.id],
    queryFn: () =>
      productApi.getProductsInGroup({
        id: productGroup?.id as string,
        page: '1',
        limit: '50'
      }),
    enabled: Boolean(productGroup),
    staleTime: 1000 * 60 * 3
  })
  const productsInGroup = productsInGroupData?.data.data || []

  //! Handle add product
  const queryClient = useQueryClient()
  const addProductToEventMutation = useMutation({ mutationFn: eventApi.addProductToEvent })
  const addProductToEvent = () => {
    setLoadingPage(true)
    const body = {
      event_id: eventId,
      item_id: currentProduct.id
    }
    addProductToEventMutation.mutate(body, {
      onSettled: () => {
        setLoadingPage(false)
      },
      onSuccess: () => {
        setSuccessDialog(true)
        queryClient.invalidateQueries({ queryKey: ['events', 'detail', eventId] })
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }

  //! Style
  const buttonStyle = 'rounded-xl bg-unhoveringBg px-6 py-2 font-medium text-darkText hover:bg-hoveringBg'

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-around'>
        <p className='desktop:tetx-xl text-center text-lg font-semibold uppercase text-primaryBlue'>
          Thêm / xóa sản phẩm trong sự kiện
        </p>
        <button
          onClick={() => {
            setIsAddingProduct(false)
          }}
          className={'rounded-xl bg-alertRed/80 px-6 py-2 font-medium text-darkText hover:bg-alertRed'}
        >
          Hủy
        </button>
      </div>

      <div className='gird-cols-1 grid gap-4 desktop:grid-cols-2 desktop:gap-0'>
        <div className='col-span-1 space-y-4 px-4 desktop:border-r'>
          <AdminSelectProductGroup />
          <div className='flex items-center justify-center space-x-4'>
            <p className='text-center text-lg font-medium uppercase'>Thêm tất cả sản phẩm trong nhóm</p>
            <button className={buttonStyle}>Xác nhận</button>
          </div>
        </div>
        <div className='col-span-1 space-y-4 px-4'>
          <AdminSelectsVariant />
          <div
            className={classNames('flex items-center justify-center space-x-4', {
              'opacity-50': !currentProduct
            })}
          >
            <p className='text-lg font-medium uppercase'>Thêm sản phẩm được chọn</p>
            <button
              onClick={addProductToEvent}
              disabled={!currentProduct}
              className={classNames(buttonStyle, {
                'cursor-not-allowed hover:bg-unhoveringBg': !currentProduct
              })}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>

      <AdminDialog isOpen={successDialog} setIsOpen={setSuccessDialog} content='Đã thêm sản phẩm' />
    </div>
  )
}
