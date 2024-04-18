import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skeleton } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import producImageApi from 'src/apis/productImage.api'
import path from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const LIMIT = 5

interface Props {
  product: ProductType
  dragging: boolean
}

export default function HomeNewProductCard({ product, dragging }: Props) {
  //? IS MOBILE
  const viewPort = useViewport()
  const isMobile = viewPort.width < 768

  const avatarUrl = product.avatar ? product.avatar.url : null
  //? GET IMAGE LIST
  const itemID = product.id
  const { data: imageListData, isFetching } = useQuery({
    queryKey: ['default_item_images', itemID],
    queryFn: () => producImageApi.getImageList(itemID as string),

    staleTime: 1000 * 60 * 3
  })
  const imageList = imageListData?.data.data || []
  const displayImages = imageList?.length > LIMIT ? imageList.slice(1, LIMIT) : imageList.slice(1, imageList.length)

  //? HANDLE ENTER ITEM
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const handleClickItem = () => {
    navigate({ pathname: `${path.home}${generateNameId({ name: product.name, id: product.id })}` })
    queryClient.invalidateQueries({ queryKey: ['user_wish_list'] })
  }

  //! Multi languages
  const { t } = useTranslation('productdetail')
  const tag = product.tag

  return (
    <button
      className='w-full cursor-grab items-start rounded-lg text-left duration-200 hover:bg-lightColor700/60 dark:hover:bg-darkColor700/60'
      onClick={(e) => {
        if (dragging) e.preventDefault()
        else handleClickItem()
      }}
    >
      <div className='grid w-full grid-cols-2 gap-2 p-4 tablet:grid-cols-3 tablet:px-8 tablet:py-6 desktop:py-8 desktopLarge:gap-4 desktopLarge:px-12 desktopLarge:py-10'>
        <div className='col-span-1'>
          <div className='relative w-full bg-[#dfdfdf] pt-[80%] dark:bg-[#282828]'>
            <div className='absolute left-0 top-0 h-full w-full'>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={product.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
                />
              ) : (
                <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                  <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-span-1 tablet:col-span-2'>
          <div className='flex h-full flex-col justify-between pl-2 tabletSmall:pl-8 desktop:pl-10 desktopLarge:pl-14'>
            <div className='flex flex-col justify-between space-y-2 overflow-hidden'>
              <p className='h-full justify-center overflow-hidden truncate text-lg font-semibold uppercase text-darkText duration-200 dark:text-lightText desktop:text-xl desktopLarge:text-3xl'>
                {product.name}
              </p>
              {product.tag !== 0 && (
                <div className='relative'>
                  <span className='flex h-4 w-16 items-center justify-center bg-tagColor text-center text-xs text-lightText desktop:h-6 desktop:w-20  desktop:text-sm'>
                    {tag == 1 && t('tag.top seller')}
                    {tag == 2 && t('tag.signature')}
                    {tag == 3 && t('tag.favourite')}
                  </span>
                  <div className='absolute left-16 top-0 h-0 w-0 border-[8px] border-y-tagColor border-l-tagColor border-r-transparent desktop:left-20 desktop:border-[12px]' />
                </div>
              )}

              <span className='text-sm font-medium text-haretaColor dark:text-haretaColor tabletSmall:text-base desktop:text-lg desktopLarge:text-xl'>
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
                          <div className='relative w-full overflow-hidden pt-[100%]'>
                            <img
                              src={image.image ? image.image.url : ''}
                              alt={product.name}
                              className='pointer-events-none absolute left-0 top-0 h-full w-full object-scale-down'
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
