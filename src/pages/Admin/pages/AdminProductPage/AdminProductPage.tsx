import { useNavigate, useParams } from 'react-router-dom'
import { getIdFromNameId } from 'src/utils/utils'
import { Fragment, createContext, useContext, useEffect, useState } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import productApi from 'src/apis/product.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import LoadingSection from 'src/components/LoadingSection'
import AdminSelectsVariant from '../../components/AdminSelectsVariant'
import AdminProductInfor from '../../components/AdminProductInfor'
import { adminProductApi } from 'src/apis/admin.api'
import DialogPopup from 'src/components/DialogPopup'
import LoadingRing from 'src/components/LoadingRing'
import classNames from 'classnames'
import AdminEditProduct from '../../components/AdminEditProduct'
import AdminDialog from '../../components/AdminDialog'

export default function AdminProductPage() {
  const { setProductGroup, currentProduct } = useContext(AdminContext)

  //! DELCARE STATES
  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)
  const [updateExcutingDialog, setUpdateExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  const [deleteExcutingDialog, setDeleteExcutingDialog] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File>()
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false)
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [undefinedError, setUndefinedError] = useState<boolean>(false)

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

  //! BUTTON FUNCTIONS
  const turnOnEditingMode = () => {
    setEditingMode(true)
  }
  const turnOffEditingMode = () => {
    setEditingMode(false)
  }

  //! HANDLE EDITING MODE

  //! HANDLE DELETE POST
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const deletePostMutation = useMutation({
    mutationFn: adminProductApi.deleteProduct
  })
  const openDeleteDialog = () => {
    setDeleteDialog(true)
  }
  const deletePost = () => {
    setDeleteDialog(false)
    setDeleteExcutingDialog(true)
    setExcuting(true)

    //:: On success
    queryClient.invalidateQueries({ queryKey: ['admin-image-list'] })
    queryClient.invalidateQueries({ queryKey: ['admin-post-detail'] })
    queryClient.invalidateQueries({ queryKey: ['admin-post-list'] })
    window.scrollTo({ top: 0, left: 0 })
    setEditingMode(false)
    setExcuting(false)
  }

  const closeDeleteExcutingDialog = () => {
    setDeleteExcutingDialog(false)
  }

  return (
    <Fragment>
      {!defaultProduct && <LoadingSection />}
      {defaultProduct && (
        <div className='space-y-6'>
          <AdminSelectsVariant />

          {!editingMode && (
            <div className='flex w-full items-center justify-end'>
              <button
                className='rounded-md bg-haretaColor/80 px-6 py-1 hover:bg-haretaColor disabled:opacity-40 disabled:hover:bg-haretaColor/80'
                disabled={currentProduct == null}
                onClick={turnOnEditingMode}
              >
                Chỉnh sửa
              </button>
            </div>
          )}

          {!editingMode && <AdminProductInfor />}

          {editingMode && (
            <AdminEditProduct
              editingMode={editingMode}
              setEditingMode={setEditingMode}
              setSuccessDialogOpen={setSuccessDialogOpen}
            />
          )}
        </div>
      )}

      <DialogPopup
        isOpen={deleteDialog}
        handleClose={() => {
          setDeleteDialog(false)
        }}
      >
        <div className='flex h-full flex-col justify-between py-4'>
          <p className='text-center text-xl font-medium uppercase leading-6 text-alertRed'>Xác nhận xóa bài viết</p>
          <div className='flex items-center justify-between text-sm'>
            <button
              type='button'
              className='rounded-md bg-alertRed/80 px-4 py-1 hover:bg-alertRed'
              onClick={() => setDeleteDialog(false)}
            >
              Hủy
            </button>

            <button
              type='button'
              className='bg-primaryBackground/80 hover:bg-primaryBackground rounded-md px-4 py-1'
              onClick={deletePost}
            >
              Xóa
            </button>
          </div>
        </div>
      </DialogPopup>

      <DialogPopup isOpen={deleteExcutingDialog} handleClose={closeDeleteExcutingDialog}>
        {excuting && <LoadingRing />}
        {!excuting && (
          <p className='text-successGreen text-center text-xl font-medium uppercase leading-6'>Đã xóa bài viết</p>
        )}
      </DialogPopup>

      <AdminDialog isOpen={successDialogOpen} setIsOpen={setSuccessDialogOpen} />
    </Fragment>
  )
}
