import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { CartContext } from 'src/contexts/cart.context'
import { formatCurrency, generateNameId } from 'src/utils/utils'

interface Props {
  handleChecking: (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectAll: () => void
  handleQuantity: (purchaseIndex: number, value: number, enable: boolean) => void
  handleTypeQuantity: (purchaseIndex: number) => (value: number) => void
  handleRemove: (purchaseIndex: number) => () => void
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function AuthenticatedCartMobile(props: Props) {
  const { handleChecking, handleQuantity, handleRemove, handleSearch, handleSelectAll, handleTypeQuantity } = props

  const { extendedPurchases } = useContext(CartContext)
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  return (
    <Fragment>
      <div className='relative mx-2'>
        <div className='grid grid-cols-12 rounded-md border border-black/20 bg-[#f8f8f8] px-4 py-2 text-base font-medium uppercase text-textDark dark:border-white/20 dark:bg-[#202020] dark:text-textLight lg:text-lg'>
          <div className='col-span-1'></div>
          <div className='col-span-6 text-center'>Product</div>
          <div className='col-span-4 text-center'>Price</div>
          <div className='col-span-1'></div>
        </div>
        <div className='my-2 h-[480px] overflow-auto rounded-md border border-black/20 bg-[#f8f8f8] p-2 dark:border-white/20 dark:bg-[#202020]'>
          {extendedPurchases.length > 0 ? (
            extendedPurchases?.map((purchase, index) => (
              <div
                key={purchase.id}
                className='mt-2 flex items-center rounded-lg border border-black/10 bg-[#efefef] p-2 text-center text-textDark first:mt-0 dark:border-white/10 dark:bg-[#101010] dark:text-textLight'
              >
                <div className='w-full'>
                  <div className='grid grid-cols-12 items-center justify-between'>
                    <div className='col-span-1 flex flex-shrink-0 items-center justify-center'>
                      <input
                        type='checkbox'
                        className='h-4 w-4 accent-haretaColor'
                        checked={purchase.checked}
                        onChange={handleChecking(index)}
                      />
                    </div>
                    <p className='col-span-6 truncate  text-center text-base'>{purchase.item.name}</p>
                    <span className='col-span-4 flex items-center justify-center text-xs'>
                      ${formatCurrency(purchase.item.price)}
                    </span>
                    <button
                      className='col-span-1 flex items-center bg-none p-1 text-textDark dark:text-textLight'
                      onClick={handleRemove(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} className='h-4 text-red-600' />
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
                        <div className='relative flex w-[80%] flex-shrink-0 items-center pt-[80%]'>
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
                        classNameInput='h-6 mx-2 w-12 text-xs rounded-md p-1 text-center outline-none text-haretaColor dark:bg-black bg-white'
                        classNameButton='round flex items-center justify-center rounded-full bg-white p-1.5 text-textDark dark:bg-black dark:text-textLight'
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
      </div>

      <div className='fixed bottom-0 z-[5] grid w-full grid-cols-12 items-center justify-between rounded-sm bg-white px-2 py-2 shadow dark:bg-black xl:mx-4'>
        <div className=' col-span-1 flex flex-shrink-0 items-center'>
          {extendedPurchases.length > 0 && (
            <input
              type='checkbox'
              className='h-5 w-5 accent-haretaColor'
              checked={isAllChecked}
              onChange={handleSelectAll}
            />
          )}
        </div>
        <div className='col-span-1 flex items-center justify-center text-textDark dark:text-textLight'>
          ({checkedPurchasesCount})
        </div>
        <div className='col-span-7 flex items-center justify-center space-x-2'>
          <div className='col-span-1 items-center text-right uppercase text-textDark dark:text-textLight'>Total:</div>
          <span className='col-span-1 text-center text-haretaColor'>${formatCurrency(totalCheckedPurchasesPrice)}</span>
        </div>
        <button
          className={classNames(
            'col-span-3 h-8 rounded-sm border-none bg-[#eee] text-sm  text-textDark dark:bg-vintageColor  dark:text-textDark',
            {
              ' hover:bg-haretaColor dark:hover:bg-haretaColor': checkedPurchasesCount !== 0,
              'cursor-not-allowed bg-opacity-50 text-opacity-60 dark:bg-opacity-50 dark:text-opacity-60':
                checkedPurchasesCount === 0
            }
          )}
          disabled={checkedPurchasesCount === 0}
        >
          Check out
        </button>
      </div>
    </Fragment>
  )
}
