import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import { ProductImage } from 'src/types/productImage.type'
import { getIdFromNameId } from 'src/utils/utils'
import OtherItemsInCollection from './OtherItemsInCollection'
import purchaseApi from 'src/apis/cart.api'
import { useViewport } from 'src/hooks/useViewport'
import classNames from 'classnames'
import OtherItemsInType from './OtherItemsInType'
import likeItemAPi from 'src/apis/userLikeItem.api'
import DialogPopup from 'src/components/DialogPopup'
import { AppContext } from 'src/contexts/app.context'
import ProductDetailLoading from './components/ProductDetailLoading'
import ProductDetailSkeleton from './components/ProductDetailSkeleton/ProductDetailSkeleton'
import ProductDetailDesktop from './components/ProductDetailDesktop'
import ProductDetailMobile from './components/ProductDetailMobile'
import { ProductsInGroupConfig } from 'src/types/product.type'
import { AxiosError } from 'axios'
import { ErrorRespone } from 'src/types/utils.type'
import { errorResponeList } from 'src/constants/error'
import { StoreContext } from 'src/contexts/store.context'
import { useTranslation } from 'react-i18next'
import PathBar, { PathElement } from 'src/components/PathBar/PathBar'
import mainPath from 'src/constants/path'

export interface ProductImageWithIndex extends ProductImage {
  index: number
}

export default function ProductDetail() {
  const { isAuthenticated, theme } = useContext(AppContext)
  const { setWishlistIDs, wishlistIDs } = useContext(StoreContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [errorDialog, setErrorDialog] = useState<boolean>(false)
  const [likeItemDialog, setLikeItemDialog] = useState<boolean>(false)
  const [isLikedByUser, setIsLikedByUser] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const { nameId } = useParams()

  //! GET ITEM DATA
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData, isFetching } = useQuery({
    queryKey: ['product_detail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const defaltItem = productDetailData?.data.data

  //? ITEMS IN GROUP
  const itemInGroupQuery: ProductsInGroupConfig = {
    id: defaltItem?.group.id as string,
    page: '1',
    limit: '50'
  }
  const { data: itemsInGroupData } = useQuery({
    queryKey: ['items_in_group', itemInGroupQuery],
    queryFn: () => productApi.getProductsInGroup(itemInGroupQuery),

    enabled: Boolean(defaltItem)
  })
  const itemsInGroup = itemsInGroupData?.data.data || []

  //! GET WISHLIST
  const { data: wishlistData } = useQuery({
    queryKey: ['user_wish_list'],
    queryFn: () => {
      return likeItemAPi.getWishList()
    },
    staleTime: 3 * 60 * 1000,
    enabled: isAuthenticated
  })

  useEffect(() => {
    const wishlist = wishlistData?.data.data
    if (wishlist) {
      setWishlistIDs(wishlist.map((item) => item.id))
    }
  }, [setWishlistIDs, wishlistData])

  useEffect(() => {
    setIsLikedByUser(wishlistIDs.includes(id))
  }, [wishlistIDs, id])

  //! HANDLE ADD TO CART
  const addToCartMutation = useMutation({ mutationFn: purchaseApi.addToCart })
  const addToCart = (itemID: string, quantity: number) => {
    addToCartMutation.mutate(
      { item_id: itemID, quantity: quantity },
      {
        onSuccess: () => {
          showDialog()
          queryClient.invalidateQueries({ queryKey: ['purchases'] })
        },
        onError: (axiosError) => {
          const errorRespone = axiosError as AxiosError
          const errorKey = (errorRespone.response?.data as ErrorRespone).error_key
          const quantityError = errorResponeList.find((error) => error.error_key === errorKey)
          if (quantityError) {
            setErrorDialog(true)
          }
          return Promise.reject(axiosError)
        }
      }
    )
  }

  //! LIKE ITEM
  const likeItemMutation = useMutation({ mutationFn: likeItemAPi.likeItem })
  const likeItem = () => {
    setIsLikedByUser(true)
    likeItemMutation.mutate(
      { group_id: defaltItem?.group.id as string },
      {
        onSuccess: () => {
          const newWishlistIDs = [...wishlistIDs, id]
          setWishlistIDs(newWishlistIDs)
          setLikeItemDialog(true)
          setTimeout(() => {
            setLikeItemDialog(false)
          }, 3000)
        }
      }
    )
  }

  const unlikeItemMutation = useMutation({ mutationFn: likeItemAPi.unlikeItem })
  const unlikeItem = () => {
    setIsLikedByUser(false)
    unlikeItemMutation.mutate(
      { group_id: defaltItem?.group.id as string },
      {
        onSuccess: () => {
          const IDindex = wishlistIDs.indexOf(id)
          const tempArray = wishlistIDs
          if (IDindex > -1) {
            tempArray.splice(IDindex, 1)
            setWishlistIDs(tempArray)
          }
        }
      }
    )
  }

  const toggleLikeItem = () => {
    isLikedByUser && unlikeItem()
    !isLikedByUser && likeItem()
  }

  const showDialog = () => {
    setDialogIsOpen(true)
    setTimeout(() => {
      closeDialog()
    }, 1500)
  }

  const closeDialog = () => {
    setDialogIsOpen(false)
  }

  //? CHANGE TITLE
  useEffect(() => {
    document.title = `${defaltItem?.name} | Hareta Workshop`
  })

  //? translation
  const { t } = useTranslation('productdetail')

  if (!defaltItem) return <ProductDetailLoading />
  //! PATH BAR
  const pathList: PathElement[] = [
    {
      pathName: t('path.store'),
      url: mainPath.store,
      isNotALink: false
    },
    {
      pathName: defaltItem.name,
      url: '',
      isNotALink: true
    }
  ]
  return (
    <div className='bg-lightBg py-2 dark:bg-darkBg desktop:py-3 desktopLarge:py-4'>
      <div className='container'>
        <PathBar pathList={pathList} />

        {!isMobile && (
          <Fragment>
            {isFetching && <ProductDetailSkeleton />}
            {!isFetching && (
              <ProductDetailDesktop
                defaultItem={defaltItem}
                isLikedByUser={isLikedByUser}
                itemsInGroup={itemsInGroup}
                addToCart={addToCart}
                toggleLikeItem={toggleLikeItem}
              />
            )}
            <div className='my-20 space-y-20'>
              <OtherItemsInCollection collectionName={defaltItem.collection} />
              <OtherItemsInType type={defaltItem.type} />
            </div>
          </Fragment>
        )}
        {isMobile && (
          <Fragment>
            {isFetching && <ProductDetailSkeleton />}
            {!isFetching && (
              <ProductDetailMobile
                itemsInGroup={itemsInGroup}
                defaultItem={defaltItem}
                isLikedByUser={isLikedByUser}
                addToCart={addToCart}
                toggleLikeItem={toggleLikeItem}
              />
            )}
          </Fragment>
        )}
      </div>

      <DialogPopup
        isOpen={dialogIsOpen}
        handleClose={closeDialog}
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

      <DialogPopup
        isOpen={likeItemDialog}
        handleClose={() => setLikeItemDialog(false)}
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
        <p className='mt-6 text-center text-xl font-medium leading-6'>Item was added to your Wishlist</p>
      </DialogPopup>

      <DialogPopup
        isOpen={errorDialog}
        handleClose={() => setErrorDialog(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className='text-center'>
          <FontAwesomeIcon
            icon={faXmark}
            className={classNames('h-auto w-8 text-red-700 tablet:w-10 desktop:w-12 desktopLarge:w-16')}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>
          The quantity of the current item you are trying to add exceed our store
        </p>
      </DialogPopup>
    </div>
  )
}
