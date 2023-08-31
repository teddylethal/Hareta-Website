import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useContext, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import path from 'src/constants/path'
import { ProductImage } from 'src/types/productImage.type'
import { getIdFromNameId } from 'src/utils/utils'
import OtherItemsInCollection from './OtherItemsInCollection'
import purchaseApi from 'src/apis/cart.api'
import { useViewport } from 'src/hooks/useViewport'
import classNames from 'classnames'
import OtherItemsInType from './OtherItemsInType'
import likeItemAPi from 'src/apis/userLikeItem.api'
import DialogPopup from 'src/components/DialogPopup'
import { ThemeContext } from 'src/App'
import { AppContext } from 'src/contexts/app.context'
import ProductDetailLoading from './components/ProductDetailLoading'
import ProductDetailSkeleton from './components/ProductDetailSkeleton/ProductDetailSkeleton'
import ProductDetailDesktop from './components/ProductDetailDesktop'
import ProductDetailMobile from './components/ProductDetailMobile'
import { ItemInGroupConfig } from 'src/types/product.type'

export interface ProductImageWithIndex extends ProductImage {
  index: number
}

export default function ProductDetail() {
  const { theme } = useContext(ThemeContext)
  const { isAuthenticated } = useContext(AppContext)

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [likeItemDialog, setLikeItemDialog] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const { nameId } = useParams()

  //? GET ITEM DATA
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData, isFetching } = useQuery({
    queryKey: ['item', id],
    queryFn: () => productApi.getProductDetail(id as string),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const defaltItem = productDetailData?.data.data

  //? ITEMS IN GROUP
  const itemInGroupQuery: ItemInGroupConfig = {
    id: defaltItem?.group.id as string,
    page: '1',
    limit: '50'
  }
  const { data: itemsInGroupData } = useQuery({
    queryKey: ['items_in_group', itemInGroupQuery],
    queryFn: () => productApi.getItemsInGroup(itemInGroupQuery),
    keepPreviousData: true,
    enabled: Boolean(defaltItem)
  })
  const itemsInGroup = itemsInGroupData?.data.data || []

  //? WISHLIST DATA
  const { data: wishlistData } = useQuery({
    queryKey: ['favourite_list'],
    queryFn: () => {
      return likeItemAPi.getWishList()
    },
    staleTime: 3 * 60 * 1000,
    enabled: isAuthenticated
  })
  const favouriteList = wishlistData?.data.data
  const favouriteListId = favouriteList ? favouriteList.map((item) => item.id) : []
  const isLikedByUser = favouriteListId.includes(id)

  //? API FUNCTIONS
  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const addToCart = (itemID: string, quantity: number) => {
    addToCartMutation.mutate(
      { item_id: itemID, quantity: quantity },
      {
        onSuccess: () => {
          showDialog()
          queryClient.invalidateQueries({ queryKey: ['purchases'] })
        }
      }
    )
  }

  const likeItemMutation = useMutation(likeItemAPi.likeItem)
  const likeItem = () => {
    likeItemMutation.mutate(
      { group_id: defaltItem?.group.id as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['favourite_list'] })
          setLikeItemDialog(true)
          setTimeout(() => {
            setLikeItemDialog(false)
          }, 3000)
        }
      }
    )
  }

  const unlikeItemMutation = useMutation(likeItemAPi.unlikeItem)
  const unlikeItem = () => {
    unlikeItemMutation.mutate(
      { group_id: defaltItem?.id as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['favourite_list'] })
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

  if (!defaltItem) return <ProductDetailLoading />
  return (
    <div className='bg-lightBg py-2 dark:bg-darkBg lg:py-3 xl:py-4'>
      <div className='container'>
        <div className='relative mb-2 flex shrink items-center justify-start space-x-1 rounded-lg bg-[#efefef] px-2 py-1 text-xs font-light uppercase text-textDark duration-500 dark:bg-[#202020] dark:text-textLight lg:mb-3 lg:space-x-2 lg:px-4 lg:py-2 lg:text-sm xl:mb-4 xl:px-6 xl:py-3'>
          <NavLink
            to={path.home}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            home
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <NavLink
            to={path.store}
            className={({ isActive }) =>
              classNames({
                'text-brownColor dark:text-haretaColor': isActive,
                'hover:text-brownColor dark:hover:text-haretaColor': !isActive
              })
            }
          >
            store
          </NavLink>
          <FontAwesomeIcon icon={faAngleRight} />
          <div className={'text-brownColor dark:text-haretaColor'}>{defaltItem.name}</div>
        </div>
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
    </div>
  )
}
