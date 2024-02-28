import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminProductApi } from 'src/apis/admin.api'
import DialogPopup from 'src/components/DialogPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import ImageInput from '../../components/ImageInput'
import AdminUpdatingPage from '../AdminUpdatingPage'
import producImageApi from 'src/apis/productImage.api'
import AdminProductGroup from '../../components/AdminProductGroup'
import AdminSelectsVariant from '../../components/AdminSelectsVariant'

export default function AdminUploadProductAvatar() {
  const { currentProduct } = useContext(AdminContext)

  const [avatarFile, setAvatarFile] = useState<File>()
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)

  const previewImage = useMemo(() => {
    return avatarFile ? URL.createObjectURL(avatarFile) : ''
  }, [avatarFile])

  const avatar = currentProduct?.avatar?.url || ''

  //? GET IMAGE LIST
  const { data: itemImageListData, refetch } = useQuery({
    queryKey: ['item_image_list'],
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
  const addItemImage = useMutation({ mutationFn: producImageApi.addImage })

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
          addItemImage.mutate(addImageBody, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['item_image_list'] })
            }
          })
        }
        uploadAvatarMutation.mutate(body, {
          onSuccess: () => {
            showSuccessDialog(setSuccessDialogOpen)
            queryClient.invalidateQueries({ queryKey: ['items_in_group'] })
            queryClient.invalidateQueries({ queryKey: ['adminDefaultProductList'] })
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
      <AdminUpdatingPage />
      <div className='mt-4 grid grid-cols-12 gap-4'>
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
                    <ImageInput onChangeImageFile={handleChangeAvatarFile} />
                  </div>
                </Fragment>
              )}
            </div>
            <div className='mt-10 space-y-4'>
              <div className='grid grid-cols-2'>
                <div className='col-span-1'>
                  <p className='lg:text-lg text-base font-medium uppercase text-white/60'>name</p>
                </div>
                <div className='col-span-1'>
                  <p className='lg:text-lg text-base font-medium uppercase'>{currentProduct?.name}</p>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='col-span-1'>
                  <p className='lg:text-lg text-base font-medium uppercase text-white/60'>color</p>
                </div>
                <div className='col-span-1'>
                  <p className='lg:text-lg text-base font-medium uppercase'>{currentProduct?.color}</p>
                </div>
              </div>
              {currentProduct && (
                <div className='flex w-full justify-end'>
                  <button
                    className='rounded-lg border border-white/40 bg-black px-4 py-2 hover:border-haretaColor'
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='col-span-6 space-y-6'>
          <AdminProductGroup />
          <AdminSelectsVariant />
        </div>
      </div>
      <DialogPopup
        isOpen={successDialogOpen}
        handleClose={() => {
          setSuccessDialogOpen(false)
        }}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className=' text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className={classNames('text- rounded-full  bg-white/20 p-4 text-center text-success', {})}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>Upload avatar successfully</p>
      </DialogPopup>
    </div>
  )
}
