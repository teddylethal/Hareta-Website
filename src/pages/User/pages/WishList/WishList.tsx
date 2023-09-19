import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { Fragment, useContext, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import likeItemAPi from 'src/apis/userLikeItem.api'
import path from 'src/constants/path'
import { Product } from 'src/types/product.type'
import { generateNameId } from 'src/utils/utils'
import purchaseApi from 'src/apis/cart.api'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'

import classNames from 'classnames'
import { omit } from 'lodash'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useViewport } from 'src/hooks/useViewport'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from 'src/contexts/app.context'

//? IMPORT COMPONENTS
const UnlikeItemDialog = React.lazy(() => import('./UnlikeItemDialog'))
const DialogPopup = React.lazy(() => import('src/components/DialogPopup'))
const WishlistItem = React.lazy(() => import('../../components/WishlistItem'))
const WishlistItemMobile = React.lazy(() => import('../../components/WishlistItemMobile'))

export default function WishList() {
  const { theme, isAuthenticated } = useContext(AppContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [unlikeDialog, setUnlikeDialog] = useState<boolean>(false)
  const [unlikedItemId, setUnlikeItemId] = useState<string>('')

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: favouriteListData } = useQuery({
    queryKey: ['user_wish_list'],
    queryFn: () => {
      return likeItemAPi.getWishList()
    },
    enabled: isAuthenticated
  })
  const favouriteList = favouriteListData?.data.data as Product[]

  const handleClickItem = (item: Product) => () => {
    navigate({ pathname: `${path.home}${generateNameId({ name: item.name, id: item.id })}` })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const addToCart = (id: string) => () => {
    addToCartMutation.mutate(
      { item_id: id, quantity: 1 },
      {
        onSuccess: () => {
          showSuccessDialog(setDialogIsOpen)
          queryClient.invalidateQueries({ queryKey: ['purchases'] })
        }
      }
    )
  }

  const openUnlikeItemDialog = (id: string) => () => {
    setUnlikeItemId(id)
    setUnlikeDialog(true)
  }

  //? CHOOSE FILTER
  const queryConfig = useQueryConfig()
  const handleChooseFilter = (field: string, value: string) => () => {
    let searchParams = createSearchParams({
      ...queryConfig
    })
    if (field === 'category') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            category: value
          },
          ['collection', 'type', 'page', 'limit']
        )
      )
    } else if (field === 'collection') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            collection: value
          },
          ['category', 'type', 'page', 'limit']
        )
      )
    } else if (field === 'type') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            type: value
          },
          ['category', 'collection', 'page', 'limit']
        )
      )
    }

    navigate({
      pathname: path.store,
      search: searchParams.toString()
    })
  }

  return (
    <Fragment>
      <div className='m-2 h-[calc(100vh-128px)] overflow-scroll rounded-sm md:m-3 lg:mx-4 lg:my-4 lg:overscroll-contain'>
        {favouriteList?.map((item) => (
          <div
            key={item.id}
            className='mt-4 rounded-lg border border-black/20 bg-[#efefef] px-2 first:mt-0 hover:bg-[#e8e8e8] dark:border-white/20 dark:bg-[#202020] dark:hover:bg-[#171717] md:px-3 lg:px-4 '
          >
            {!isMobile && (
              <WishlistItem
                item={item}
                handleClickItem={handleClickItem}
                handleChooseFilter={handleChooseFilter}
                addToCart={addToCart}
                openUnlikeItemDialog={openUnlikeItemDialog}
              />
            )}
            {isMobile && (
              <WishlistItemMobile
                item={item}
                handleClickItem={handleClickItem}
                handleChooseFilter={handleChooseFilter}
                addToCart={addToCart}
                openUnlikeItemDialog={openUnlikeItemDialog}
              />
            )}
            <UnlikeItemDialog
              isOpen={unlikeDialog}
              handleClose={() => setUnlikeDialog(false)}
              classNameWrapper='relative w-96 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-sm transition-all'
              unlikeItemId={unlikedItemId}
              setUnlikeItemId={setUnlikeItemId}
            ></UnlikeItemDialog>
          </div>
        ))}
      </div>
      <DialogPopup
        isOpen={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all bg-black/90'
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
    </Fragment>
  )
}
