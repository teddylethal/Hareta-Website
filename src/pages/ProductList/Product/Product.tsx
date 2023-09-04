import { faCartPlus, faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Product as ProductType } from 'src/types/product.type'
import { memo, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import purchaseApi from 'src/apis/cart.api'
import itemTag from 'src/constants/itemTag'
import DialogPopup from 'src/components/DialogPopup'
import classNames from 'classnames'
import { ThemeContext } from 'src/App'
import { AppContext } from 'src/contexts/app.context'
import { CartContext } from 'src/contexts/cart.context'
import { TemporaryPurchase } from 'src/types/cart.type'
import producImageApi from 'src/apis/productImage.api'
import ImageDisplayCarousel from 'src/components/ImageDisplayCarousel'
import { ProductImage } from 'src/types/productImage.type'

const MAXLENGTH = 5

export const showSuccessDialog = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, time?: number) => {
  setIsOpen(true)
  setTimeout(() => {
    setIsOpen(false)
  }, time || 1500)
}

interface Props {
  product: ProductType
  queryConfig: QueryConfig
  likedByUser?: boolean
}

function Product({ product }: Props) {
  const { theme } = useContext(ThemeContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  //? GET IMAGE LIST
  const itemID = product.id
  const {
    data: imageListData,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['default_item_images', itemID],
    queryFn: () => producImageApi.getImageList(itemID as string),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 3
  })
  const imageList = imageListData?.data.data

  //? HANDLE CHANGE IMAGE WHILE HOVERING
  const avatarUrl = product.avatar ? product.avatar.url : null
  const [hoveringImage, setHoveringImage] = useState<boolean>(false)
  const [imageListCarousel, setImageListCarousel] = useState<ProductImage[]>([])
  useEffect(() => {
    if (imageList) {
      setImageListCarousel(imageList.length > MAXLENGTH ? imageList?.slice(0, MAXLENGTH) : imageList)
    }
  }, [imageList])

  const handleHoveringImage = () => {
    setHoveringImage(true)
  }

  const handleUnhoveringImage = () => {
    setHoveringImage(false)
  }

  const handleClickItem = () => {
    navigate({ pathname: `${path.home}${generateNameId({ name: product.name, id: product.id })}` })
  }

  return (
    <div
      className='flex w-full items-center justify-center pb-0 pt-2 duration-500 hover:pb-2 hover:pt-0'
      onMouseEnter={handleHoveringImage}
      onMouseLeave={handleUnhoveringImage}
    >
      <div className='relative  w-full overflow-hidden rounded-xl bg-[#f8f8f8] pb-4 duration-500  hover:bg-[#efefef] dark:bg-[#303030] dark:hover:bg-[#383838]'>
        <button onClick={handleClickItem} className='relative w-full bg-[#dfdfdf] pt-[75%] dark:bg-[#282828]'>
          {hoveringImage && (
            <div className='absolute left-0 top-0 h-full w-full object-cover'>
              <ImageDisplayCarousel imageList={imageListCarousel} />
              <div className='absolute inset-0'></div>
            </div>
          )}
          {!hoveringImage && (
            <div className='absolute left-0 top-0 h-full w-full'>
              {avatarUrl ? (
                <img src={avatarUrl} alt={product.name} className='absolute left-0 top-0 h-full w-full object-cover' />
              ) : (
                <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
                  <FontAwesomeIcon icon={faTriangleExclamation} fontSize={60} />
                </div>
              )}
            </div>
          )}
        </button>
        <div className='flex flex-col items-center justify-between space-x-1 space-y-1 overflow-hidden px-2 pt-2 sm:px-3 lg:px-4 lg:pt-4'>
          <button
            className='h-full justify-center overflow-hidden truncate text-center text-sm font-semibold uppercase text-textDark duration-500 hover:text-brownColor dark:text-textLight dark:hover:text-haretaColor sm:text-base lg:text-lg'
            onClick={handleClickItem}
          >
            {product.name}
          </button>

          <span className='text-xs font-medium text-brownColor dark:text-haretaColor sm:text-sm lg:text-base xl:text-lg'>
            ${formatCurrency(product.price)}
          </span>
        </div>
        {product.tag !== 0 && (
          <div className='absolute left-0 top-4'>
            <span className=' flex h-4 w-16 items-center justify-center bg-red-600 text-center text-xs text-textLight lg:h-6 lg:w-20  lg:text-sm'>
              {itemTag[product.tag]}
            </span>
            <div className='absolute left-16 top-0 h-0 w-0 border-[8px] border-y-red-600 border-l-red-600 border-r-transparent lg:left-20 lg:border-[12px]' />
          </div>
        )}
      </div>
      <DialogPopup
        isOpen={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className=' text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className={classNames('text- rounded-full  p-4 text-center text-success ', {
              'bg-black/20': theme === 'light',
              'bg-white/20': theme === 'dark'
            })}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>Item was added to cart</p>
      </DialogPopup>
    </div>
  )
}

export default memo(Product)
