import { useParams } from 'react-router-dom'
import { getIdFromNameId, showSuccessDialog } from 'src/utils/utils'
import { Fragment, useContext, useEffect, useState } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import productApi from 'src/apis/product.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import LoadingSection from 'src/components/LoadingSection'
import AdminSelectsVariant from '../../components/AdminSelectsVariant'
import AdminProductInfor from '../../components/AdminProductInfor'
import { adminProductApi } from 'src/apis/admin.api'

import AdminEditProduct from '../AdminEditProduct'
import AdminDialog from '../../components/AdminDialog'

export default function AdminProductPage() {
  const { setProductGroup, currentProduct, setCurrentProduct, defaultProductIdList } = useContext(AdminContext)

  const isDefaultProduct = defaultProductIdList.includes(currentProduct?.id as string)

  //! DELCARE STATES
  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [updateProductSuccess, setUpdateProductSuccess] = useState<boolean>(false)
  const [updateDefaultProductSuccess, setUpdateDefaultProductSuccess] = useState<boolean>(false)

  //! GET PRODUCT DETAIL
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['admin_product_detail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const defaultProduct = productDetailData?.data.data

  useEffect(() => {
    if (defaultProduct) {
      setProductGroup(defaultProduct.group)
    }
  }, [defaultProduct, setProductGroup])

  useEffect(() => {
    if (defaultProduct) {
      setCurrentProduct(defaultProduct)
    }
  }, [defaultProduct, setCurrentProduct])

  //! BUTTON FUNCTIONS
  const turnOnEditingMode = () => {
    setEditingMode(true)
  }

  //! Set default product
  const queryClient = useQueryClient()
  const setDefaultProductMutation = useMutation({ mutationFn: adminProductApi.setDefaultProduct })
  // const setDefaultProduct = handleSubmit(async (data) => {
  //   try {
  //     await setDefaultProductMutation.mutateAsync({ ...data })
  //     reset()
  //     clearErrors()
  //     queryClient.invalidateQueries({ queryKey: ['products_in_group'] })
  //     queryClient.invalidateQueries({ queryKey: ['adminDefaultProductList'] })
  //   } catch (error) {
  //     if (isAxiosBadRequestError<ErrorRespone>(error)) {
  //       const formError = error.response?.data
  //       if (formError) {
  //         const responeLog = formError?.log as string
  //         if (responeLog.search(`'name'`) !== -1) {
  //           setError('id', {
  //             message: 'ID',
  //             type: 'Server'
  //           })
  //         }
  //       }
  //     }
  //   }
  // })
  const setDefaultProduct = () => {
    if (currentProduct) {
      setDefaultProductMutation.mutate(
        { id: currentProduct.id },
        {
          onSuccess: () => {
            showSuccessDialog(setUpdateDefaultProductSuccess)
            queryClient.invalidateQueries({ queryKey: ['admin_default_product_list'] })
          }
        }
      )
    }
  }

  return (
    <Fragment>
      {!defaultProduct && <LoadingSection />}
      {defaultProduct && (
        <div className='space-y-6'>
          <AdminSelectsVariant />

          <div className='flex w-full items-center justify-between'>
            <button
              className='rounded-md bg-hoveringBg/80 px-6 py-2 hover:bg-hoveringBg disabled:opacity-40 disabled:hover:bg-hoveringBg/80'
              disabled={isDefaultProduct}
              onClick={setDefaultProduct}
            >
              Đặt làm sản phẩm mặc định
            </button>
            {!editingMode && (
              <button
                className='rounded-md bg-hoveringBg/80 px-6 py-2 hover:bg-hoveringBg disabled:opacity-40 disabled:hover:bg-haretaColor/80'
                disabled={currentProduct == null}
                onClick={turnOnEditingMode}
              >
                Chỉnh sửa
              </button>
            )}
          </div>

          {!editingMode && <AdminProductInfor />}

          {editingMode && (
            <AdminEditProduct setEditingMode={setEditingMode} setSuccessDialogOpen={setUpdateProductSuccess} />
          )}
        </div>
      )}

      <AdminDialog
        isOpen={updateProductSuccess}
        setIsOpen={setUpdateProductSuccess}
        content='Cập nhật sản phẩm thành công'
      />

      <AdminDialog
        isOpen={updateDefaultProductSuccess}
        setIsOpen={setUpdateDefaultProductSuccess}
        content='Cập nhật sản phẩm mặc định thành công'
      />
    </Fragment>
  )
}
