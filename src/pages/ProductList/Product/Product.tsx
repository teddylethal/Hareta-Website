import { faHeart, faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'
import { Product as ProductType } from 'src/types/product.type'
import { memo, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DialogPopup from 'src/components/DialogPopup'
import classNames from 'classnames'

import { AppContext } from 'src/contexts/app.context'
import producImageApi from 'src/apis/productImage.api'
import ImageDisplayCarousel from 'src/components/ImageDisplayCarousel'
import { ProductImage } from 'src/types/productImage.type'
import likeItemAPi from 'src/apis/userLikeItem.api'
import { StoreContext } from 'src/contexts/store.context'
import { useTranslation } from 'react-i18next'

const MAXLENGTH = 3

export const showSuccessDialog = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, time?: number) => {
  setIsOpen(true)
  setTimeout(() => {
    setIsOpen(false)
  }, time || 1500)
}

interface Props {
  product: ProductType
  initialLoading?: boolean
  disableClick?: boolean
}

function Product({ product, initialLoading, disableClick = false }: Props) {
  const { isAuthenticated, theme } = useContext(AppContext)
  const { setWishlistIDs, wishlistIDs } = useContext(StoreContext)

  // const initialInWishlist = wishlistIDs.includes(product.id)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(false)
  const [initialInWishlist, setInitialInWishlist] = useState<boolean>(false)

  useEffect(() => {
    setIsLikedByUser(wishlistIDs.includes(product.id))
  }, [product.id, wishlistIDs])

  const navigate = useNavigate()

  useEffect(() => {
    if (!initialLoading) {
      setInitialInWishlist(wishlistIDs.includes(product.id))
    }
  }, [initialLoading, product.id, wishlistIDs])

  //? GET IMAGE LIST
  const itemID = product.id
  const { data: imageListData, isLoading } = useQuery({
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
      setImageListCarousel(imageList.length > MAXLENGTH + 1 ? imageList?.slice(1, MAXLENGTH + 1) : imageList.slice(1))
    }
  }, [imageList])

  const handleHoveringImage = () => {
    setHoveringImage(true)
  }

  const handleUnhoveringImage = () => {
    setHoveringImage(false)
  }

  //? HANDLE ENTER ITEM
  const queryClient = useQueryClient()
  const handleClickItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disableClick) {
      event.preventDefault()
    } else {
      navigate({ pathname: `${path.home}${generateNameId({ name: product.name, id: product.id })}` })
      queryClient.invalidateQueries({ queryKey: ['user_wish_list'] })
    }
  }

  //? HANDLE LIKE ITEM
  const likeItem = () => {
    setIsLikedByUser(true)
    const newWishlistIDs = [...wishlistIDs, product.id]
    setWishlistIDs(newWishlistIDs)
  }

  const unlikeItem = () => {
    setIsLikedByUser(false)
    const IDindex = wishlistIDs.indexOf(product.id)
    const tempArray = wishlistIDs
    if (IDindex > -1) {
      tempArray.splice(IDindex, 1)
      setWishlistIDs(tempArray)
    }
  }

  const toggleLikeItem = () => {
    isLikedByUser && unlikeItem()
    !isLikedByUser && likeItem()
  }

  const unlikeItemMutation = useMutation(likeItemAPi.unlikeItem)
  const likeItemMutation = useMutation(likeItemAPi.likeItem)
  useEffect(() => {
    const updateLikeItem = setTimeout(() => {
      if (isLikedByUser && initialInWishlist === false) {
        likeItemMutation.mutate({ group_id: product.group.id })
      } else if (!isLikedByUser && initialInWishlist === true) {
        unlikeItemMutation.mutate({ group_id: product.group.id })
      }
    }, 1000)

    return () => clearTimeout(updateLikeItem)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLikedByUser])

  //? use translation
  const { t } = useTranslation('productdetail')
  const tag = product.tag

  return (
    <div
      className='flex w-full items-center justify-center pb-0 pt-2 duration-500 md:hover:pb-2 md:hover:pt-0'
      onMouseMove={handleHoveringImage}
      onMouseLeave={handleUnhoveringImage}
    >
      <div className='relative w-full overflow-hidden rounded-xl bg-white pb-4 duration-500 dark:bg-[#303030]'>
        {hoveringImage && (
          <div className='relative bg-[#dfdfdf] dark:bg-[#282828]'>
            <ImageDisplayCarousel imageList={imageListCarousel} isLoading={isLoading} />
            <button className='absolute inset-0' onClick={handleClickItem}></button>
          </div>
        )}
        {!hoveringImage && (
          <div className='relative w-full bg-[#dfdfdf] pt-[75%] dark:bg-[#282828]'>
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
        )}
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
            <span className=' flex h-4 w-16 items-center justify-center bg-red-600 text-center text-xs text-textDark lg:h-6 lg:w-20  lg:text-sm'>
              {tag == 1 && t('tag.top seller')}
              {tag == 2 && t('tag.signature')}
              {tag == 3 && t('tag.favourite')}
            </span>
            <div className='absolute left-16 top-0 h-0 w-0 border-[8px] border-y-red-600 border-l-red-600 border-r-transparent lg:left-20 lg:border-[12px]' />
          </div>
        )}
        {isAuthenticated && (
          <div className='absolute right-1 top-1'>
            <button className='flex items-center justify-center rounded-xl bg-black/50 p-2' onClick={toggleLikeItem}>
              <FontAwesomeIcon
                icon={faHeart}
                className={classNames('h-auto w-4 md:w-5  xl:w-6', {
                  'text-red-500': isLikedByUser,
                  ' text-textLight': !isLikedByUser
                })}
              />
            </button>
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
