import React, { Fragment } from 'react'
import { ExtendedTemporaryPurchase } from '../UnauthenticatedCart/UnauthenticatedCart'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

import QuantityController from 'src/components/QuantityController'

interface Props {
  extendedTempPurchases: ExtendedTemporaryPurchase[]
  handleChecking: (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectAll: () => void
  handleQuantity: (purchaseIndex: number, value: number, enable: boolean) => void
  handleTypeQuantity: (purchaseIndex: number) => (value: number) => void
  handleRemove: (purchaseIndex: number) => () => void
  handleCheckout: () => void
}

export default function UnauthenticatedCartMobile(props: Props) {
  const {
    extendedTempPurchases,
    handleChecking,
    handleQuantity,
    handleRemove,
    handleSelectAll,
    handleTypeQuantity,
    handleCheckout
  } = props

  const isAllChecked = extendedTempPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedTempPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  return (
    <Fragment>
      <div className='relative'>
        <div className='lg:text-lg grid grid-cols-12 rounded-md border border-black/20 bg-lightWhite900 px-4 py-2 text-base font-medium uppercase text-darkText dark:border-white/20 dark:bg-darkGray900 dark:text-lightText'>
          <div className='col-span-1'></div>
          <div className='col-span-6 text-center'>Product</div>
          <div className='col-span-4 text-center'>Price</div>
          <div className='col-span-1'></div>
        </div>
        <div className='my-2 h-[460px] overflow-auto overscroll-contain rounded-md border border-black/20 bg-lightWhite900 p-2 dark:border-white/20 dark:bg-darkGray900'>
          {extendedTempPurchases.length > 0 ? (
            extendedTempPurchases?.map((purchase, index) => (
              <div
                key={purchase.id}
                className='mt-2 flex items-center rounded-lg border border-black/10 bg-lightWhite700 p-2 text-center text-darkText first:mt-0 dark:border-white/10 dark:bg-darkGray700 dark:text-lightText'
              >
                <div className='w-full'>
                  <div className='grid grid-cols-12 items-center justify-between'>
                    <div className='col-span-1 flex flex-shrink-0 items-center justify-center'>
                      <input
                        type='checkbox'
                        className='h-4 w-4 accent-primaryColor'
                        checked={purchase.checked}
                        onChange={handleChecking(index)}
                      />
                    </div>
                    <p className='col-span-6 truncate text-center text-base font-semibold'>{purchase.item.name}</p>
                    <span className='col-span-4 flex items-center justify-center text-xs'>
                      ${formatCurrency(purchase.item.price)}
                    </span>
                    <button
                      className='col-span-1 flex items-center bg-none p-1 text-darkText dark:text-lightText'
                      onClick={handleRemove(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} className='h-4 text-alertRed' />
                    </button>
                  </div>
                  <div className='grid grid-cols-12 items-center'>
                    <div className='col-span-1'></div>
                    <div className='col-span-6'>
                      <Link
                        to={`${path.home}${generateNameId({
                          name: purchase.item.name,
                          id: purchase.item.id
                        })}`}
                        className='flex flex-grow items-center'
                      >
                        <div className='relative flex w-[80%] flex-shrink-0 items-center overflow-hidden pt-[80%]'>
                          <img
                            alt={purchase.item.name}
                            src={
                              purchase.item.avatar
                                ? purchase.item.avatar.url
                                : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
                            }
                            className='absolute left-0 top-0 h-full w-full object-scale-down'
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className='mt-4 grid grid-cols-12'>
                    <div className='col-span-1'></div>
                    <div className='col-span-6'>
                      <QuantityController
                        max={purchase.item.quantity}
                        value={purchase.quantity}
                        classNameWrapper='justify-center'
                        inputClassName='h-6 mx-2 w-12 text-xs rounded-md p-1 text-center outline-none text-haretaColor dark:bg-black bg-white'
                        classNameButton='round flex items-center justify-center rounded-full bg-white p-1.5 text-darkText dark:bg-black dark:text-lightText'
                        classNameIcon='h-3'
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

                    <span className=' col-span-4 text-sm text-haretaColor'>
                      ${formatCurrency(purchase.item.price * purchase.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='relative h-full w-full'>
              <img
                src='/images/emptyCart.png'
                alt='Empty cart'
                className='absolute left-0 top-0 h-full w-full object-scale-down'
              />
            </div>
          )}
        </div>
        <div className='xl:mx-4 grid w-full grid-cols-12 items-center justify-between rounded-sm px-2 py-2  shadow'>
          <div className=' col-span-1 flex flex-shrink-0 items-center'>
            {extendedTempPurchases.length > 0 && (
              <input
                name='all_are_selected'
                type='checkbox'
                className='h-5 w-5 accent-primaryColor'
                checked={isAllChecked}
                onChange={handleSelectAll}
              />
            )}
          </div>
          <div className='col-span-1 flex items-center justify-center text-darkText dark:text-lightText'>
            ({checkedPurchasesCount})
          </div>
          <div className='col-span-7 flex items-center justify-center space-x-2'>
            <div className='col-span-1 items-center text-right uppercase text-darkText dark:text-lightText'>Total:</div>
            <span className='col-span-1 text-center font-medium text-primaryColor'>
              ${formatCurrency(totalCheckedPurchasesPrice)}
            </span>
          </div>
          {checkedPurchasesCount === 0 && (
            <div className='sm:text-sm col-span-3 flex h-8 w-full cursor-not-allowed items-center justify-center rounded-md border-none bg-haretaColor text-center text-xs font-medium uppercase text-darkText opacity-40'>
              Check out
            </div>
          )}
          {checkedPurchasesCount > 0 && (
            <Link
              to={path.shippingInfor}
              onClick={handleCheckout}
              className='sm:text-sm col-span-3 flex h-8 w-full items-center justify-center rounded-md border-none bg-haretaColor text-center text-xs font-medium uppercase text-darkText hover:bg-primaryColor'
            >
              Check out
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  )
}
