import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminProductApi } from 'src/apis/admin.api'
import { showSuccessDialog } from 'src/utils/utils'
import producImageApi from 'src/apis/productImage.api'
import AdminSelectsVariant from '../../components/AdminSelectsVariant'
import AdminProductImageHeader from '../../components/AdminProductImageHeader'
import AdminImageInput from '../../components/AdminImageInput'
import AdminProductGroupList from '../../components/AdminProductGroupList'
import AdminDialog from '../../components/AdminDialog'

export default function AdminProductUpdateAvatar() {
  const { currentProduct } = useContext(AdminContext)

  const [avatarFile, setAvatarFile] = useState<File>()
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)

  const previewImage = useMemo(() => {
    return avatarFile ? URL.createObjectURL(avatarFile) : ''
  }, [avatarFile])

  const avatar = currentProduct?.avatar?.url || ''

  //? GET IMAGE LIST
  const { data: itemImageListData, refetch } = useQuery({
    queryKey: ['admin', 'products', currentProduct?.id || '', 'images'],
    queryFn: () => producImageApi.getImageList(currentProduct?.id as string),

    enabled: Boolean(currentProduct)
  })
  const imageList = itemImageListData?.data.data
  useEffect(() => {
    if (currentProduct) {
      refetch()
    }
  }, [currentProduct, refetch])

  //? AUTO ADD FIRST IMAGE
  const addProductImageMutation = useMutation({ mutationFn: producImageApi.addImage })

  //? UPLOAD AVATAR
  const queryClient = useQueryClient()
  const uploadAvatarMutation = useMutation({ mutationFn: adminProductApi.uploadProductAvatar })
  const handleSubmit = () => {
    try {
      if (avatarFile && currentProduct) {
        const body = {
          id: currentProduct.id as string,
          file: avatarFile
        }
        if (imageList?.length === 0) {
          const addImageBody = {
            item_id: currentProduct.id,
            color: currentProduct.color,
            file: avatarFile
          }
          addProductImageMutation.mutate(addImageBody, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['admin', 'products', currentProduct?.id || '', 'images'] })
            }
          })
        }
        uploadAvatarMutation.mutate(body, {
          onSuccess: () => {
            showSuccessDialog(setSuccessDialogOpen)
            queryClient.invalidateQueries({ queryKey: ['admin', 'products', currentProduct.id] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'default-products'] })
            queryClient.invalidateQueries({ queryKey: ['admin', 'product-groups'] })
          }
        })
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const handleChangeAvatarFile = (file?: File) => {
    setAvatarFile(file)
  }

  return (
    <div>
      <AdminProductImageHeader />
      <div className='mt-4 grid grid-cols-12 gap-4'>
        <div className='col-span-6 space-y-4'>
          <AdminProductGroupList />
          <AdminSelectsVariant />
        </div>

        <div className='col-span-6'>
          <div className='relative z-10 rounded-lg border border-white/40 p-4'>
            <div className='relative w-full pt-[75%]'>
              {currentProduct && (
                <Fragment>
                  <img
                    src={previewImage || avatar}
                    alt={currentProduct?.name}
                    className='absolute left-0 top-0 h-full w-full object-scale-down'
                  />
                  <div className='absolute bottom-1 left-1/2 w-1/4 -translate-x-1/2 rounded-lg border border-white/20 bg-black px-2 py-1'>
                    <AdminImageInput onChangeImageFile={handleChangeAvatarFile} />
                  </div>
                </Fragment>
              )}
            </div>
            <div className='mt-10 space-y-4'>
              <div className='grid grid-cols-2'>
                <div className='col-span-1'>
                  <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>Tên sản phẩm</p>
                </div>
                <div className='col-span-1'>
                  <p className='text-base font-medium uppercase desktop:text-lg'>{currentProduct?.name}</p>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='col-span-1'>
                  <p className='text-base font-medium uppercase text-white/60 desktop:text-lg'>Màu</p>
                </div>
                <div className='col-span-1'>
                  <p className='text-base font-medium uppercase desktop:text-lg'>{currentProduct?.color}</p>
                </div>
              </div>
              {currentProduct && (
                <div className='flex w-full justify-end'>
                  <button
                    className='rounded-lg border border-white/40 bg-black px-4 py-2 hover:border-haretaColor'
                    onClick={handleSubmit}
                  >
                    Xác nhận
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AdminDialog
        isOpen={successDialogOpen}
        setIsOpen={setSuccessDialogOpen}
        content='Cập nhật ảnh sản phẩm thành công'
      />
    </div>
  )
}
