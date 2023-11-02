import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import producImageApi from 'src/apis/productImage.api'
import ItemTag from 'src/constants/itemTag'
import path from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

export default function NewReleaseItem({ product }: Props) {
  //? IS MOBILE
  const viewPort = useViewport()
  const isMobile = viewPort.width < 768

  const avatarUrl = product.avatar ? product.avatar.url : null
  //? GET IMAGE LIST
  const itemID = product.id
  const { data: imageListData, isFetching } = useQuery({
    queryKey: ['default_item_images', itemID],
    queryFn: () => producImageApi.getImageList(itemID as string),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 3
  })
  const imageList = imageListData?.data.data || []
  const displayImages = imageList?.length > 4 ? imageList.slice(1, 4) : imageList.slice(1, imageList.length)

  //? HANDLE ENTER ITEM
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const handleClickItem = () => {
    navigate({ pathname: `${path.home}${generateNameId({ name: product.name, id: product.id })}` })
    queryClient.invalidateQueries({ queryKey: ['user_wish_list'] })
  }

  return (
    <button
      className='w-full items-start rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5'
      onClick={handleClickItem}
    >
      <div className='grid w-full grid-cols-2 gap-2 p-4 md:grid-cols-3 md:px-8 md:py-6 lg:py-8 xl:gap-4 xl:px-12 xl:py-10'>
        <div className='col-span-1'>
          <div className='relative w-full bg-[#dfdfdf] pt-[80%] dark:bg-[#282828]'>
            <div className='absolute left-0 top-0 h-full w-full'>
              {avatarUrl ? (
                <img src={avatarUrl} alt={product.name} className='absolute left-0 top-0 h-full w-full object-cover' />
              ) : (
                <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                  <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-span-1 md:col-span-2'>
          <div className='flex h-full flex-col justify-between pl-2 sm:pl-8 lg:pl-10 xl:pl-14'>
            <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
              <p className='h-full justify-center overflow-hidden truncate text-lg font-semibold uppercase text-textDark duration-500 hover:text-brownColor dark:text-textLight dark:hover:text-haretaColor lg:text-xl xl:text-3xl'>
                {product.name}
              </p>
              {product.tag !== 0 && (
                <div className='relative'>
                  <span className='flex h-4 w-16 items-center justify-center bg-red-600 text-center text-xs text-textLight lg:h-6 lg:w-20  lg:text-sm'>
                    {ItemTag[product.tag]}
                  </span>
                  <div className='absolute left-16 top-0 h-0 w-0 border-[8px] border-y-red-600 border-l-red-600 border-r-transparent lg:left-20 lg:border-[12px]' />
                </div>
              )}

              <span className='text-sm font-medium text-brownColor dark:text-haretaColor sm:text-base lg:text-lg xl:text-xl'>
                ${formatCurrency(product.price)}
              </span>
            </div>

            {!isMobile && (
              <div className='mt-4 w-full overflow-auto rounded-lg px-2 '>
                <div className='grid w-full grid-cols-4 gap-4'>
                  {isFetching &&
                    Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div className='col-span-1' key={index}>
                          <div className='relative w-full overflow-hidden rounded-lg bg-white/10 pt-[100%]'>
                            <Skeleton
                              variant='rounded'
                              className='absolute left-0 top-0'
                              width={'100%'}
                              height={'100%'}
                            />
                          </div>
                        </div>
                      ))}
                  {imageListData &&
                    !isFetching &&
                    displayImages.map((image) => {
                      return (
                        <div className='col-span-1' key={image.id}>
                          <div className='rouded-lg relative w-full overflow-hidden pt-[100%]'>
                            <img
                              src={image.image ? image.image.url : ''}
                              alt={product.name}
                              className='absolute left-0 top-0 h-full w-full object-scale-down'
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
