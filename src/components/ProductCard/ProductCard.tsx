import { faHeart, faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
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
import ProductTag from 'src/components/ProductTag'

const MAXLENGTH = 3

interface Props {
  product: ProductType
  initialLoading?: boolean
  disableClick?: boolean
}

function ProductCard({ product, initialLoading, disableClick = false }: Props) {
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

  //! GET IMAGE LIST
  const itemID = product.id
  const { data: imageListData, isLoading } = useQuery({
    queryKey: ['default_item_images', itemID],
    queryFn: () => producImageApi.getImageList(itemID as string),

    staleTime: 1000 * 60 * 3
  })
  const imageList = imageListData?.data.data

  //! HANDLE CHANGE IMAGE WHILE HOVERING
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

  //! HANDLE ENTER ITEM
  const queryClient = useQueryClient()
  const handleClickItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disableClick) {
      event.preventDefault()
    } else {
      navigate({ pathname: `${path.home}${generateNameId({ name: product.name, id: product.id })}` })
      queryClient.invalidateQueries({ queryKey: ['user_wish_list'] })
    }
  }

  //! HANDLE LIKE ITEM
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

  const unlikeItemMutation = useMutation({ mutationFn: likeItemAPi.unlikeItem })
  const likeItemMutation = useMutation({ mutationFn: likeItemAPi.likeItem })
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

  return (
    <div
      className='flex w-full items-center justify-center pb-0 pt-2 duration-200 tablet:hover:pb-2 tablet:hover:pt-0'
      onMouseMove={handleHoveringImage}
      onMouseLeave={handleUnhoveringImage}
    >
      <div className='relative w-full overflow-hidden rounded-xl bg-productLightBg pb-4 duration-200 dark:bg-productDarkBg'>
        {hoveringImage && (
          <div className='relative'>
            <ImageDisplayCarousel imageList={imageListCarousel} isLoading={isLoading} />
            <button className='absolute inset-0' onClick={handleClickItem}></button>
          </div>
        )}
        {!hoveringImage && (
          <div className='relative w-full pt-[75%]'>
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
        <div className='flex flex-col items-center justify-between space-x-1 space-y-1 overflow-hidden px-2 pt-2 tabletSmall:px-3 desktop:px-4 desktop:pt-4'>
          <button
            className='h-full justify-center overflow-hidden truncate text-center text-sm font-semibold uppercase text-darkText duration-200 hover:text-primaryColor dark:text-lightText dark:hover:text-primaryColor tabletSmall:text-base desktop:text-lg'
            onClick={handleClickItem}
          >
            {product.name}
          </button>

          <span className='text-xs font-semibold text-haretaColor dark:text-haretaColor tabletSmall:text-sm desktop:text-base desktopLarge:text-lg'>
            ${formatCurrency(product.price)}
          </span>
        </div>
        {product.tag !== 0 && (
          <div className='absolute left-0 top-4'>
            <ProductTag tag={product.tag} />
          </div>
        )}
        {isAuthenticated && (
          <div className='absolute right-1 top-1'>
            <button className='flex items-center justify-center rounded-xl bg-black/50 p-2' onClick={toggleLikeItem}>
              <FontAwesomeIcon
                icon={faHeart}
                className={classNames('h-auto w-4 tablet:w-5  desktopLarge:w-6', {
                  'text-favouriteRed': isLikedByUser,
                  ' text-lightText': !isLikedByUser
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

export default memo(ProductCard)
