import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { AdminContext } from 'src/contexts/admin.context'
import producImageApi from 'src/apis/productImage.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { ProductImage } from 'src/types/productImage.type'
import classNames from 'classnames'

export default function AdminItemImages() {
  const { currentItem, setCurrentImage, currentImage } = useContext(AdminContext)

  //? GET IMAGE LIST
  const {
    data: itemImageListData,
    isFetched,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['item_image_list'],
    queryFn: () => producImageApi.getImageList(currentItem?.id as string),

    enabled: Boolean(currentItem)
  })
  const imageList = itemImageListData?.data.data
  // const imageList = useMemo(() => itemImageListData?.data.data, [itemImageListData?.data.data])
  useEffect(() => {
    if (currentItem) {
      refetch()
    }
  }, [currentItem, refetch])

  //? HANDLE CHOOSE IMAGE
  const handleSelectImage = (image: ProductImage) => () => {
    setCurrentImage(image)
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-black p-4'>
      <div className='flex w-full flex-col items-center justify-center space-y-4'>
        <p className=' lg:text-xl text-center text-lg font-semibold uppercase text-white'>Image list</p>
        <div className='h-60 w-full overflow-scroll rounded-lg border border-white/40 bg-[#202020]'>
          {!currentItem && (
            <div className='inset-0 flex h-full w-full cursor-not-allowed items-center justify-center text-2xl uppercase'>
              select a variant
            </div>
          )}
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
              {imageList?.map((image) => {
                const isActive = image.id === currentImage?.id
                return (
                  <div
                    key={image.id}
                    className={classNames('col-span-1 h-min rounded-xl p-1 outline outline-1 outline-offset-0', {
                      'outline-2 outline-haretaColor': isActive,
                      'outline-haretaColor/40 ': !isActive
                    })}
                  >
                    <button
                      className='relative flex w-full items-center justify-center pt-[75%]'
                      onClick={handleSelectImage(image)}
                    >
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
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
