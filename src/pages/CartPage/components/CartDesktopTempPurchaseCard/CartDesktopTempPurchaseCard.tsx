import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ExtendedTemporaryPurchase } from '../../children/CartForGuest/CartForGuest'
import QuantityController from 'src/components/QuantityController'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import mainPath from 'src/constants/path'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

interface Props {
  purchase: ExtendedTemporaryPurchase
  index: number
  handleChecking: (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleQuantity: (purchaseIndex: number, value: number, enable: boolean) => void
  handleTypeQuantity: (purchaseIndex: number) => (value: number) => void
  handleRemove: (purchaseIndex: number) => () => void
}

export default function CartDesktopTempPurchaseCard(props: Props) {
  const { purchase, index, handleChecking, handleQuantity, handleRemove, handleTypeQuantity } = props

  //! Multi languages
  const { t } = useTranslation('cart')

  return (
    <div
      key={purchase.id}
      className='border-b border-black/60 last:border-none hover:bg-lightColor900/60 dark:border-white/60 dark:hover:bg-darkColor900/60'
    >
      <div className='grid grid-cols-12 items-center rounded-sm p-4 text-center text-darkText first:mt-0 first:border-none dark:text-lightText'>
        <div className='col-span-6'>
          <div className='flex'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-haretaColor'
                checked={purchase.checked}
                onChange={handleChecking(index)}
              />
            </div>
            <Link
              to={`${mainPath.store}/${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
              className='flex flex-grow items-center'
            >
              <div className='flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden text-lg desktop:text-2xl'>
                {purchase.item.avatar ? (
                  <img alt={purchase.item.name} src={purchase.item.avatar.url} />
                ) : (
                  <div className='flex h-full w-full items-center justify-center bg-darkColor900'>
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                  </div>
                )}
              </div>
              <div className='ml-4 flex-grow px-2 text-left'>
                <div className='truncate text-base font-medium desktop:text-lg'>{purchase.item.name}</div>
              </div>
            </Link>
          </div>
        </div>
        <div className='col-span-6'>
          <div className='grid grid-cols-4 items-center'>
            <div className='col-span-1'>
              <div className='flex items-center justify-center'>
                <span className='text-sm font-semibold text-darkText dark:text-lightText desktop:text-base'>
                  ${formatCurrency(purchase.item.price)}
                </span>
              </div>
            </div>
            <div className='col-span-1'>
              <QuantityController
                max={purchase.item.quantity}
                value={purchase.quantity}
                classNameWrapper='flex items-center justify-center'
                onIncrease={(value) => handleQuantity(index, value, value <= purchase.item.quantity)}
                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                onType={handleTypeQuantity(index)}
                onFocusOut={(value) =>
                  handleQuantity(
                    index,
                    value,
                    value >= 1 && value <= purchase.item.quantity && value !== purchase.previousQuantity
                  )
                }
                disabled={purchase.disabled}
              />
            </div>
            <div className='col-span-1'>
              <span className='text-haretaColor'>${formatCurrency(purchase.item.price * purchase.quantity)}</span>
            </div>
            <div className='col-span-1'>
              <button
                className='bg-none text-xs text-alertRed/80 hover:text-alertRed hover:underline desktop:text-sm'
                onClick={handleRemove(index)}
              >
                {t('content.remove')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
