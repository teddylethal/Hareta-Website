import { useContext, useEffect, useState } from 'react'
import QuantityController from '../QuantityController'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { CartContext, ExtendsPurchase } from 'src/contexts/cart.context'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import purchaseApi from 'src/apis/cart.api'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

interface Props {
  purchase: ExtendsPurchase
  index: number
  handleChecking: (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleRemove: (purchaseIndex: number) => () => void
}

export default function ItemInCart({ purchase, index, handleChecking, handleRemove }: Props) {
  const { setExtendedPurchases, unavailablePurchaseIds, setUnavailablePurchaseIds } = useContext(CartContext)

  const [quantity, setQuantity] = useState<number>(purchase.quantity)

  //? HANDLE QUANTITY
  const queryClient = useQueryClient()
  const updatePurchasesMutation = useMutation({
    mutationFn: purchaseApi.updatePurchases,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
    }
  })

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      setQuantity(value)
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].quantity = value
      })
    )
  }

  useEffect(() => {
    const updateQuantity = setTimeout(() => {
      updatePurchasesMutation.mutate({ id: purchase.id, quantity: quantity })
      const newUnavailablePurchaseIds = unavailablePurchaseIds.filter((id) => {
        return id != purchase.id
      })
      setUnavailablePurchaseIds(newUnavailablePurchaseIds)
    }, 1000)

    return () => clearTimeout(updateQuantity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase.id, quantity])

  //? transaltion
  const { t } = useTranslation('cart')

  //? is unavailable
  const unavailable = unavailablePurchaseIds.includes(purchase.id)

  return (
    <div className='grid grid-cols-12 items-center rounded-sm p-4 text-center text-darkText first:mt-0 first:border-none dark:text-lightText'>
      <div className='col-span-6'>
        <div className='flex'>
          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
            <input
              name='is_selected'
              type='checkbox'
              className='h-5 w-5 accent-haretaColor'
              checked={purchase.checked}
              onChange={handleChecking(index)}
            />
          </div>
          <Link
            to={`${path.home}${generateNameId({
              name: purchase.item.name,
              id: purchase.item.id
            })}`}
            className='flex flex-grow items-center'
          >
            <div className='flex h-24 w-24 flex-shrink-0 items-center overflow-hidden'>
              <img
                alt={purchase.item.name}
                src={
                  purchase.item.avatar
                    ? purchase.item.avatar.url
                    : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
                }
              />
            </div>
            <div className='ml-4 flex-grow px-2 text-left'>
              <div
                className={classNames('lg:text-lg truncate text-base', {
                  'text-alertRed': unavailable
                })}
              >
                {purchase.item.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className='col-span-6'>
        <div className='grid grid-cols-4 items-center'>
          <div className='col-span-1'>
            <div className='flex items-center justify-center'>
              <span className='text-darkText dark:text-lightText'>${formatCurrency(purchase.item.price)}</span>
            </div>
          </div>
          <div className='col-span-1'>
            <QuantityController
              max={purchase.item.quantity}
              value={quantity}
              classNameWrapper='flex items-center justify-center'
              onIncrease={(value) => handleQuantity(index, value, value <= purchase.item.quantity)}
              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
              setQuantity={setQuantity}
              onType={handleTypeQuantity(index)}
              onFocusOut={(value) =>
                handleQuantity(
                  index,
                  value,
                  value >= 1 && value <= purchase.item.quantity && value !== purchase.previousQuantity
                )
              }
              disabled={purchase.disabled}
              inputClassName={classNames(
                'h-6 text-sm lg:text-base lg:h-8 mx-1 lg:mx-2 w-14 rounded-lg p-1 text-center outline-none dark:bg-black bg-white border border-black/20 dark:border-white/20',
                {
                  'text-red-600 font-semibold': unavailable,
                  'text-haretaColor font-medium': !unavailable
                }
              )}
            />
          </div>
          <div className='col-span-1'>
            <span className='text-haretaColor'>${formatCurrency(purchase.item.price * purchase.quantity)}</span>
          </div>
          <div className='col-span-1'>
            <button
              className='lg:text-sm bg-none text-xs text-darkText/80 hover:text-darkText hover:underline dark:text-lightText/80 dark:hover:text-lightText'
              onClick={handleRemove(index)}
            >
              {t('content.remove')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
