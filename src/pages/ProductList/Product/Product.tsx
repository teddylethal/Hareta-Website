import { faCartPlus, faCheck, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Product as ProductType } from 'src/types/product.type'
import { memo, useContext, useState } from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { omit } from 'lodash'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import purchaseApi from 'src/apis/cart.api'
import itemTag from 'src/constants/itemTag'
import likeItemAPi from 'src/apis/userLikeItem.api'
import DialogPopup from 'src/components/DialogPopup'
import classNames from 'classnames'
import { ThemeContext } from 'src/App'
import { AppContext } from 'src/contexts/app.context'
import { CartContext } from 'src/contexts/cart.context'
import { TemporaryPurchase } from 'src/types/cart.type'

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

function Product({ product, queryConfig, likedByUser = false }: Props) {
  const { theme } = useContext(ThemeContext)
  const { isAuthenticated } = useContext(AppContext)
  const { purchasesInLS, setPurchasesInLS } = useContext(CartContext)

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [createTempCart, setCreateTempCart] = useState<boolean>(false)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const addToCart = () => {
    addToCartMutation.mutate(
      { item_id: product.id as string, quantity: 1 },
      {
        onSuccess: () => {
          const scrollX = window.scrollX
          const scrollY = window.scrollY
          showSuccessDialog(setDialogIsOpen)

          queryClient.invalidateQueries({ queryKey: ['purchases'] })
          window.scrollTo(scrollX, scrollY)
        }
      }
    )
  }

  const handleClickItem = () => {
    navigate({ pathname: `${path.home}${generateNameId({ name: product.name, id: product.id })}` })
  }

  const handleCollectionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedCollection = String((e.target as HTMLInputElement).innerText)
    navigate({
      pathname: path.store,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            collection: selectedCollection
          },
          ['type', 'page', 'limit']
        )
      ).toString()
    })
    // window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  const handleTypeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedType = String((e.target as HTMLInputElement).innerText)
    navigate({
      pathname: path.store,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            type: selectedType
          },
          ['collection', 'page', 'limit']
        )
      ).toString()
    })
    // window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  const likeItemMutation = useMutation(likeItemAPi.likeItem)
  const likeItem = () => {
    likeItemMutation.mutate(
      { item_id: product?.id as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['favourite_list'] })
        }
      }
    )
  }

  const unlikeItemMutation = useMutation(likeItemAPi.unlikeItem)
  const unlikeItem = () => {
    unlikeItemMutation.mutate(
      { item_id: product?.id as string },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['favourite_list'] })
        }
      }
    )
  }

  const toggleLikeItem = () => {
    likedByUser && unlikeItem()
    !likedByUser && likeItem()
  }

  const createTemporaryCart = () => {
    const newPurchase: TemporaryPurchase = {
      id: Date.now().toString(),
      quantity: 1,
      item: product
    }
    setPurchasesInLS([...purchasesInLS, newPurchase])
    setCreateTempCart(false)
    showSuccessDialog(setDialogIsOpen)
  }

  const addToTemporaryCart = () => {
    const newPurchase: TemporaryPurchase = {
      id: Date.now().toString(),
      quantity: 1,
      item: product
    }
    const purchaseIndex = purchasesInLS.findIndex((purchase) => purchase.item.id === newPurchase.item.id)
    if (purchaseIndex !== -1) {
      const newQuantity = purchasesInLS[purchaseIndex].quantity + 1
      const newPurchasesList = purchasesInLS.map((purchase, index) => {
        if (index === purchaseIndex) {
          return { ...purchase, quantity: newQuantity }
        } else return purchase
      })
      setPurchasesInLS(newPurchasesList)
    } else {
      setPurchasesInLS([...purchasesInLS, newPurchase])
    }
    showSuccessDialog(setDialogIsOpen)
  }

  return (
    <div className='flex w-full items-center justify-center p-2 duration-500 hover:p-0'>
      <div className='relative m-2 w-full rounded-md bg-[#f8f8f8] pb-4 duration-500 hover:bg-[#efefef] dark:bg-[#303030] dark:hover:bg-[#383838]'>
        <div className='relative w-full pt-[60%]'>
          <button onClick={handleClickItem}>
            <img
              src={
                product.avatar
                  ? `${product.avatar.url}`
                  : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
              }
              alt={product.name}
              className='absolute left-0 top-0 h-full w-full object-scale-down'
            />
          </button>
        </div>
        <div className='mx-3 mt-4 flex justify-between space-x-1 overflow-hidden'>
          <div className='flex flex-col justify-between space-y-1 overflow-hidden'>
            <button
              className='h-full  overflow-hidden truncate text-left text-lg text-textDark duration-500 dark:text-textLight'
              onClick={handleClickItem}
            >
              {product.name}
            </button>
            <div className='flex items-center space-x-4 py-1'>
              <button
                className='flex justify-start text-sm capitalize text-gray-500 hover:text-haretaColor'
                onClick={handleCollectionClick}
              >
                {product.collection}
              </button>
              <button
                className='flex justify-start text-sm capitalize text-gray-500 hover:text-haretaColor'
                onClick={handleTypeClick}
              >
                {product.type}
              </button>
            </div>
            <span className='text-haretaColor'>${formatCurrency(product.price)}</span>
          </div>

          <div
            className={classNames('mx-1 flex flex-col items-center ', {
              'justify-between': isAuthenticated,
              'justify-end': !isAuthenticated
            })}
          >
            {isAuthenticated && (
              <button onClick={toggleLikeItem} className='text-black'>
                <FontAwesomeIcon
                  icon={faHeart}
                  fontSize={24}
                  className={classNames('mt-1', { 'text-red-500': likedByUser })}
                />
              </button>
            )}
            <button
              className=''
              onClick={
                isAuthenticated
                  ? addToCart
                  : purchasesInLS.length === 0
                  ? () => {
                      setCreateTempCart(true)
                    }
                  : addToTemporaryCart
              }
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                fontSize={24}
                className='text-textDark duration-500 hover:text-haretaColor dark:text-textLight dark:hover:text-haretaColor'
              />
            </button>
          </div>
        </div>
        {product.tag !== 0 && (
          <div className='absolute left-0 top-4'>
            <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
              {itemTag[product.tag]}
            </span>
            <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
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

      <DialogPopup
        isOpen={createTempCart}
        handleClose={() => setCreateTempCart(false)}
        classNameWrapper='relative w-96 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <p className='mt-6 text-center text-xl font-medium uppercase leading-6 text-red-400'>Cart expires soon</p>
        <div className='mt-4 space-y-2 text-center'>
          <div className='flex justify-center space-x-1 '>
            <p>Items added without</p>
            <span className='text-haretaColor'>login</span>
            <p>are temporary</p>
          </div>
          <div className='flex justify-center space-x-1'>
            <span className='text-haretaColor'>Login</span>
            <p>to</p>
            <span className='text-haretaColor'>save</span>
            <p>your items</p>
          </div>
        </div>
        <div className='mt-8 flex justify-around'>
          <Link
            to={path.login}
            type='button'
            className={classNames('justify-center rounded-md border border-transparent px-6 py-2 text-sm font-medium', {
              'bg-brownColor/80 hover:bg-brownColor': theme === 'light',
              'bg-haretaColor/80 hover:bg-haretaColor/60': theme === 'dark'
            })}
          >
            Login
          </Link>
          <button
            type='button'
            className={classNames('justify-center rounded-md border border-transparent px-6 py-2 text-sm font-medium', {
              'bg-brownColor/80 hover:bg-brownColor': theme === 'light',
              'bg-haretaColor/80 hover:bg-haretaColor/60': theme === 'dark'
            })}
            onClick={createTemporaryCart}
          >
            Continue
          </button>
        </div>
      </DialogPopup>
    </div>
  )
}

export default memo(Product)
