import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useContext, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import likeItemAPi from 'src/apis/userLikeItem.api'
import path from 'src/constants/path'
import { Product } from 'src/types/product.type'
import { generateNameId } from 'src/utils/utils'
import DialogPopup from 'src/components/DialogPopup'
import purchaseApi from 'src/apis/cart.api'
import UnlikeItemDialog from './UnlikeItemDialog'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import { ThemeContext } from 'src/App'
import classNames from 'classnames'
import { omit } from 'lodash'
import useQueryConfig from 'src/hooks/useQueryConfig'
import WishlistItem from '../../components/WishlistItem'
import { useViewport } from 'src/hooks/useViewport'
import WishlistItemMobile from '../../components/WishlistItemMobile'

export default function WishList() {
  const { theme } = useContext(ThemeContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [unlikeDialog, setUnlikeDialog] = useState<boolean>(false)
  const [unlikedItemId, setUnlikeItemId] = useState<string>('')

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: favouriteListData } = useQuery({
    queryKey: ['favourite_list'],
    queryFn: () => {
      return likeItemAPi.getFavouriteList()
    },
    staleTime: 3 * 60 * 1000
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
      <div className='m-2 h-[calc(100vh-128px)] overflow-scroll rounded-sm md:m-3 lg:mx-4 lg:my-4  lg:overscroll-contain'>
        {favouriteList?.map((item) => (
          <div
            key={item.id}
            className='mt-4 rounded-lg border border-black/20 bg-[#efefef] px-2 first:mt-0 hover:bg-[#e8e8e8] dark:border-white/20 dark:bg-[#202020] dark:hover:bg-[#171717] md:px-3 lg:px-4 '
          >
            {/* <div className='grid grid-cols-12 items-center py-6 text-center text-textDark dark:text-textLight '>
              <div className='col-span-4'>
                <button className='relative w-full pt-[75%]' onClick={handleClickItem(item)}>
                  <img
                    alt={item.name}
                    src={
                      item.avatar
                        ? item.avatar.url
                        : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
                    }
                    className='absolute left-0 top-0 h-full w-full object-scale-down'
                  />
                </button>
              </div>
              <div className='col-span-5 flex h-[75%] flex-col justify-between'>
                <div className='ml-8 space-y-2'>
                  <button
                    className=' flex items-center justify-start truncate py-2 text-lg font-medium lg:text-xl xl:text-2xl'
                    onClick={handleClickItem(item)}
                  >
                    {item.name}
                  </button>
                  {item.tag !== 0  && (
                    
                    <div className='relative '>
                      <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
                        {itemTag[item.tag]}
                      </span>
                      <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
                    </div>
                  )}
                </div>
                <div className='ml-8 flex items-center space-x-4'>
                  <button
                    className='flex items-center justify-center truncate rounded-lg border border-black/40 px-4 py-1 capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
                    onClick={handleChooseFilter('category', item.category)}
                  >
                    {item.category}
                  </button>

                  <button
                    className='flex items-center justify-center truncate rounded-lg border border-black/40 px-4 py-1 capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
                    onClick={handleChooseFilter('collection', item.collection)}
                  >
                    {item.collection}
                  </button>

                  <button
                    className='flex items-center justify-center truncate rounded-lg border border-black/40 px-4 py-1 capitalize hover:bg-[#dfdfdf] dark:border-white/40 dark:hover:bg-black'
                    onClick={handleChooseFilter('type', item.type)}
                  >
                    {item.type}
                  </button>
                </div>
              </div>
              <div className='relative col-span-3  h-[75%] '>
                <div className='relative grid w-full grid-cols-2 items-center rounded-md bg-white py-2 dark:bg-black '>
                  <span className='col-span-1 flex items-center justify-center text-sm font-medium text-textDark dark:text-textLight lg:text-base'>
                    ${formatCurrency(item.price)}
                  </span>
                  <div className='absolute left-1/2 h-full border-l border-black/30 dark:border-white/30'></div>
                  <button
                    className='col-span-1 flex items-center justify-center bg-none text-brownColor/80 hover:text-brownColor dark:text-haretaColor dark:hover:text-haretaColor/80'
                    onClick={addToCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faCartPlus} fontSize={24} onClick={addToCart(item.id)} />
                  </button>
                </div>
                <button
                  className='absolute bottom-0 right-0 bg-none hover:text-textDark dark:hover:text-textLight'
                  onClick={openUnlikeItemDialog(item.id)}
                >
                  <p className='text-sm text-textDark/80 hover:text-textDark hover:underline dark:text-textLight/80 dark:hover:text-textLight lg:text-sm'>
                    Remove
                  </p>
                </button>
              </div>
            </div> */}
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
        <button
          type='button'
          className={classNames(
            'absolute right-2 top-2 flex justify-center rounded-md p-2 text-sm font-medium  hover:text-red-600 ',
            {
              'text-textDark/50': theme === 'light',
              'text-textLight/50': theme === 'dark'
            }
          )}
        >
          <FontAwesomeIcon icon={faXmark} fontSize={20} />
        </button>
      </DialogPopup>
    </Fragment>
  )
}
