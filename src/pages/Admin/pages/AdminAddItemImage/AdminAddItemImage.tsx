import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import AdminItemGroup from '../../components/AdminItemGroup'
import AdminItemsInGroup from '../../components/AdminItemsInGroup'
import AdminImagesPage from '../AdminImagesPage'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import ImageInput from '../../components/ImageInput'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import producImageApi from 'src/apis/productImage.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { ColorRing } from 'react-loader-spinner'
import DialogPopup from 'src/components/DialogPopup'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'

export default function AdminAddItemImage() {
  const { currentItem, itemGroup } = useContext(CreatingItemContext)

  const [avatarFile, setAvatarFile] = useState<File>()
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)

  const previewImage = useMemo(() => {
    return avatarFile ? URL.createObjectURL(avatarFile) : ''
  }, [avatarFile])

  const handleChangeAvatarFile = (file?: File) => {
    setAvatarFile(file)
  }

  //? GET IMAGE LIST
  const queryClient = useQueryClient()
  const {
    data: itemImageListData,
    isFetched,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['item_image_list'],
    queryFn: () => producImageApi.getImageList(currentItem?.id as string),
    keepPreviousData: true,
    enabled: Boolean(currentItem)
  })
  const imageList = itemImageListData?.data.data
  // const imageList = useMemo(() => itemImageListData?.data.data, [itemImageListData?.data.data])
  useEffect(() => {
    if (currentItem) {
      refetch()
    }
  }, [currentItem, refetch])

  //? HANDLE ADD IMAGE
  const addItemImage = useMutation(producImageApi.addImage)
  const handleSubmit = () => {
    try {
      if (avatarFile && currentItem) {
        const body = {
          item_id: currentItem.id,
          color: currentItem.color,
          file: avatarFile
        }
        addItemImage.mutate(body, {
          onSuccess: () => {
            showSuccessDialog(setSuccessDialogOpen)
            queryClient.invalidateQueries({ queryKey: ['item_image_list'] })
          }
        })
      }
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <div>
      <AdminImagesPage />

      <div className=' mt-8 grid grid-cols-2 gap-6'>
        <div className='col-span-1'>
          <div className='sticky top-6 rounded-lg border border-white/40'>
            <div className='grid grid-cols-2 gap-6 p-2'>
              <div className='col-span-1'>
                <div className='relative w-full overflow-hidden rounded-md pt-[75%]'>
                  {currentItem && (
                    <Fragment>
                      {avatarFile && (
                        <img
                          src={previewImage}
                          alt={currentItem?.name}
                          className='absolute left-0 top-0 h-full w-full object-scale-down'
                        />
                      )}
                      {!avatarFile && <div className='absolute left-0 top-0 h-full w-full bg-black/50'></div>}
                      <div className='absolute bottom-1 left-1/2 w-1/2 -translate-x-1/2 rounded-lg border border-white/20 bg-black px-2 py-1'>
                        <ImageInput onChangeImageFile={handleChangeAvatarFile} />
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
              <div className='col-span-1'>
                <div className='flex h-full flex-col justify-around'>
                  <div className='grid grid-cols-3 gap-4'>
                    <p className='col-span-1 font-medium uppercase text-textLight/60'>Item ID</p>
                    <p className='col-span-2 line-clamp-2 capitalize text-haretaColor'>{currentItem?.id}</p>
                  </div>
                  <div className='grid grid-cols-3 gap-4'>
                    <p className='col-span-1 font-medium uppercase text-textLight/60'>Name</p>
                    <p className='col-span-2 line-clamp-2 capitalize text-haretaColor'>{itemGroup?.name}</p>
                  </div>
                  <div className='grid grid-cols-3 gap-4'>
                    <p className='col-span-1 font-medium uppercase text-textLight/60'>Color</p>
                    <p className='col-span-2 line-clamp-2 capitalize text-haretaColor'>{currentItem?.color}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=' flex w-full items-center justify-end px-4'>
              <div className='relative'>
                <button
                  className='flex items-center justify-center rounded-lg bg-haretaColor/80 px-4 py-1 hover:bg-haretaColor/60'
                  onClick={handleSubmit}
                >
                  Add image
                </button>
                {!avatarFile && <div className='absolute inset-0 bg-black/50'></div>}
              </div>
            </div>
            <div className='mt-4 space-y-4 p-4'>
              <p className='text-center text-lg font-medium uppercase text-white'>Image list</p>
              <div className='h-80 overflow-hidden rounded-lg border border-white/40'>
                {isFetching && (
                  <div className='inset-0 flex h-full w-full items-center justify-center bg-black/50'>
                    <ColorRing
                      visible={true}
                      height='60'
                      width='60'
                      ariaLabel='blocks-loading'
                      wrapperStyle={{}}
                      wrapperClass='blocks-wrapper'
                      colors={['#ADD8E6', '#ADD8E6', '#ADD8E6', '#ADD8E6', '#ADD8E6']}
                    />
                  </div>
                )}
                {isFetched && (
                  <div className='m-2 grid grid-cols-4 gap-6'>
                    {imageList?.map((image) => (
                      <div key={image.id} className='col-span-1'>
                        <div className='relative w-full overflow-hidden rounded-xl pt-[75%]'>
                          {image.image ? (
                            <img
                              src={image.image.url}
                              alt={image.id}
                              className='absolute left-0 top-0 h-full w-full object-scale-down'
                            />
                          ) : (
                            <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                              <FontAwesomeIcon icon={faTriangleExclamation} fontSize={10} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='flex min-h-full flex-col justify-between'>
            <AdminItemGroup />
            <AdminItemsInGroup />
          </div>
        </div>
      </div>
      <DialogPopup
        isOpen={successDialogOpen}
        handleClose={() => {
          setSuccessDialogOpen(false)
        }}
        classNameWrapper='relative w-72 h-40 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all flex items-center justify-center'
      >
        <p className='text-center text-xl font-medium uppercase leading-6 text-green-500'>Image was added</p>
      </DialogPopup>
    </div>
  )
}
