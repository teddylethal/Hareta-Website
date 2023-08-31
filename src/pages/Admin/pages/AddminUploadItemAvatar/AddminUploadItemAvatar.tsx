import { Fragment, useContext, useMemo, useState } from 'react'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminItemApi } from 'src/apis/admin.api'
import DialogPopup from 'src/components/DialogPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import AdminItemGroup from '../../components/AdminItemGroup'
import AdminItemsInGroup from '../../components/AdminItemsInGroup'
import ImageInput from '../../components/ImageInput'

export default function AddminUploadItemAvatar() {
  const { currentItem } = useContext(CreatingItemContext)

  const [avatarFile, setAvatarFile] = useState<File>()
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)

  const previewImage = useMemo(() => {
    return avatarFile ? URL.createObjectURL(avatarFile) : ''
  }, [avatarFile])

  const avatar = currentItem?.avatar?.url || ''

  //? UPLOAD AVATAR
  const queryClient = useQueryClient()
  const uploadAvatarMutation = useMutation(adminItemApi.uploadItemAvatar)
  const handleSubmit = () => {
    try {
      if (avatarFile) {
        const body = {
          id: currentItem?.id as string,
          file: avatarFile
        }
        uploadAvatarMutation.mutate(body, {
          onSuccess: () => {
            showSuccessDialog(setSuccessDialogOpen)
            queryClient.invalidateQueries({ queryKey: ['items_in_group'] })
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
      <div className='flex items-center justify-center rounded-xl border border-white/40 py-4'>
        <p className='text-lg font-medium uppercase text-textLight lg:text-3xl'>Upload avatar for item</p>
      </div>
      <div className='mt-4 grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <div className='relative z-10 rounded-lg border border-white/40 p-4'>
            <div className='relative w-full pt-[75%]'>
              {currentItem && (
                <Fragment>
                  <img
                    src={previewImage || avatar}
                    alt={currentItem?.name}
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
                  <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>name</p>
                </div>
                <div className='col-span-1'>
                  <p className='text-base font-medium uppercase lg:text-lg'>{currentItem?.name}</p>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='col-span-1'>
                  <p className='text-base font-medium uppercase text-white/60 lg:text-lg'>color</p>
                </div>
                <div className='col-span-1'>
                  <p className='text-base font-medium uppercase lg:text-lg'>{currentItem?.color}</p>
                </div>
              </div>
              {currentItem && (
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
          <AdminItemGroup />
          <AdminItemsInGroup />
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
