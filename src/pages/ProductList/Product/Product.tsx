import { faCartPlus, faCheck, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Product as ProductType } from 'src/types/product.type'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
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

export const showSuccessDialog = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsOpen(true)
  setTimeout(() => {
    setIsOpen(false)
  }, 1500)
}

interface Props {
  product: ProductType
  queryConfig: QueryConfig
  likedByUser?: boolean
}

export default function Product({ product, queryConfig, likedByUser = false }: Props) {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const addToCart = () => {
    addToCartMutation.mutate(
      { item_id: product.id as string, quantity: 1 },
      {
        onSuccess: () => {
          showSuccessDialog(setDialogIsOpen)

          queryClient.invalidateQueries({ queryKey: ['items_in_cart'] })
        }
      }
    )
  }

  const handleClickItem = () => {
    navigate({ pathname: `${path.home}${generateNameId({ name: product.name, id: product.id })}` })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
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

  // console.log(product.avatar.url)
  return (
    <div className='relative h-full w-full bg-[#dfdfdf] px-2 pb-4 pt-2 duration-500 dark:bg-[#303030]'>
      <div className='relative w-full pt-[75%]'>
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
      <div className='mx-1 mt-3 flex justify-between space-x-1'>
        <div className='flex flex-col justify-between space-y-1'>
          <button className='truncate text-lg text-textDark duration-500 dark:text-textLight' onClick={handleClickItem}>
            {product.name}
          </button>
          <div className='flex items-center space-x-4'>
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

        <div className='mx-1 flex flex-col items-center justify-between'>
          <button onClick={toggleLikeItem} className='text-black'>
            <FontAwesomeIcon icon={faHeart} fontSize={24} className={likedByUser ? 'text-red-500' : ''} />
          </button>
          <button className='' onClick={addToCart}>
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
      <DialogPopup
        isOpen={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all bg-black/90'
      >
        <p className='text-center text-xl font-medium leading-6 text-textLight'>Added successful</p>
        <div className='mt-4 text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className='text- rounded-full bg-white/20 p-4 text-center text-success'
          />
        </div>
        <button
          type='button'
          className='absolute right-2 top-2 flex justify-center rounded-md p-2 text-sm font-medium text-textLight/50 hover:text-red-600  '
        >
          <FontAwesomeIcon icon={faXmark} fontSize={20} />
        </button>
      </DialogPopup>
    </div>
  )
}
