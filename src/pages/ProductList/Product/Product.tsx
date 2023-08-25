import { faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Product as ProductType } from 'src/types/product.type'
import { memo, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import purchaseApi from 'src/apis/cart.api'
import itemTag from 'src/constants/itemTag'
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

function Product({ product }: Props) {
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

  // const likeItemMutation = useMutation(likeItemAPi.likeItem)
  // const likeItem = () => {
  //   likeItemMutation.mutate(
  //     { item_id: product?.id as string },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({ queryKey: ['favourite_list'] })
  //       }
  //     }
  //   )
  // }

  // const unlikeItemMutation = useMutation(likeItemAPi.unlikeItem)
  // const unlikeItem = () => {
  //   unlikeItemMutation.mutate(
  //     { item_id: product?.id as string },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries({ queryKey: ['favourite_list'] })
  //       }
  //     }
  //   )
  // }

  // const toggleLikeItem = () => {
  //   likedByUser && unlikeItem()
  //   !likedByUser && likeItem()
  // }

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
    <div className='flex w-full items-center justify-center pb-0 pt-2 duration-500 hover:pb-2 hover:pt-0'>
      <div className='relative  w-full rounded-xl bg-[#f8f8f8] pb-4 duration-500  hover:bg-[#efefef] dark:bg-[#303030] dark:hover:bg-[#383838]'>
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
        <div className='mx-1 mt-2 flex justify-between space-x-1 overflow-hidden sm:mx-2 lg:mx-3 lg:mt-4'>
          <div className='flex flex-col justify-between space-y-1 overflow-hidden'>
            <button
              className='h-full overflow-hidden truncate text-left text-sm text-textDark duration-500 hover:text-brownColor dark:text-textLight dark:hover:text-haretaColor sm:text-base lg:text-lg'
              onClick={handleClickItem}
            >
              {product.name}
            </button>

            <span className='text-xs font-medium text-brownColor dark:text-haretaColor sm:text-sm lg:text-base'>
              ${formatCurrency(product.price)}
            </span>
          </div>

          <div className={classNames('mx-1 flex items-end justify-center', {})}>
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
                className='text-base text-textDark duration-500 hover:text-brownColor dark:text-textLight dark:hover:text-haretaColor sm:text-lg lg:text-xl'
              />
            </button>
          </div>
        </div>
        {product.tag !== 0 && (
          <div className='absolute left-0 top-4'>
            <span className=' flex h-4 w-16 items-center justify-center bg-red-600 text-center text-xs text-textDark lg:h-6 lg:w-20  lg:text-sm'>
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

      <DialogPopup
        closeButton={false}
        isOpen={createTempCart}
        handleClose={() => setCreateTempCart(false)}
        classNameWrapper='relative w-96 max-w-md transform overflow-hidden rounded-2xl p-8 align-middle shadow-xl transition-all'
      >
        <p className='text-center text-xl font-medium uppercase leading-6 text-red-700'>Cart expires soon</p>
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
