import classNames from 'classnames'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { CartContext } from 'src/contexts/cart.context'
import { useViewport } from 'src/hooks/useViewport'
import { TemporaryPurchase } from 'src/types/cart.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import UnauthenticatedCartMobile from '../UnauthenticatedCartMobile'

export interface ExtendedTemporaryPurchase extends TemporaryPurchase {
  disabled: boolean
  checked: boolean
  previousQuantity: number
}

export default function UnauthenticatedCart() {
  const viewport = useViewport()
  const isMobile = viewport.width <= 768
  const { setPurchasesInLS, purchasesInLS } = useContext(CartContext)
  const [extendedTempPurchases, setExtendedTempPurchases] = useState<ExtendedTemporaryPurchase[]>([])

  useEffect(() => {
    setExtendedTempPurchases((prev) => {
      const extendedTempPurchasesObject = keyBy(prev, 'id')
      return (
        purchasesInLS?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedTempPurchasesObject[purchase.id]?.checked),
          previousQuantity: purchase.quantity
        })) || []
      )
    })
  }, [purchasesInLS])

  const isAllChecked = extendedTempPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedTempPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  const handleChecking = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedTempPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleSelectAll = () => {
    setExtendedTempPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      setExtendedTempPurchases(
        produce((draft) => {
          draft[purchaseIndex].quantity = value
        })
      )
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedTempPurchases(
      produce((draft) => {
        draft[purchaseIndex].quantity = value
      })
    )
  }

  const handleRemove = (purchaseIndex: number) => () => {
    const purchaseId = extendedTempPurchases[purchaseIndex].id
    const newPurchaseList = purchasesInLS.filter((purchase) => purchase.id !== purchaseId)
    setPurchasesInLS(newPurchaseList)
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <div className='bg-lightBg py-4 dark:bg-darkBg'>
      {!isMobile && (
        <div className='container'>
          <div className='relative flex items-center rounded-md border border-black/20 bg-white dark:border-white/20 dark:bg-black'>
            <p className='grow truncate pl-4 text-2xl uppercase  text-textDark dark:text-haretaColor xl:text-2xl'>
              Cart
            </p>
            <form name='search_in_cart' className='my-2 flex grow items-center' onSubmit={handleSearch}>
              <input
                id='search_in_cart'
                type='text'
                className='peer mr-4 w-full rounded-md  bg-transparent px-4 py-2 text-base text-textDark outline-none ring-1   ring-haretaColor/60 duration-500 autofill:text-textDark focus:ring-2 focus:ring-haretaColor dark:text-textLight dark:caret-white dark:autofill:text-textLight lg:text-lg'
                placeholder='Search'
              />
              <label
                htmlFor='search_in_cart'
                className='absolute right-8 flex h-8 w-12 items-center justify-center rounded-lg bg-haretaColor/60 duration-500 peer-focus:bg-haretaColor'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                  <path
                    fillRule='evenodd'
                    d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </label>
            </form>
          </div>

          <div className=' mt-2 rounded-md border border-black/20 bg-white dark:border-white/20 dark:bg-black'>
            <div className=''>
              <div className='grid grid-cols-12 rounded-sm px-8 py-4 text-sm uppercase text-textDark  dark:text-textLight lg:text-lg'>
                <div className='col-span-6'>
                  {/* <div className='flex flex-shrink-0 items-center justify-start pr-3'>
                    <input type='checkbox' className='h-4 w-4 accent-haretaColor' />
                  </div> */}
                  <p className='flex-grow items-center justify-center text-center text-textDark dark:text-textLight'>
                    Product
                  </p>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-4 text-center'>
                    <div className='col-span-1'>Unit Price</div>
                    <div className='col-span-1'>Quantity</div>
                    <div className='col-span-1'>Subtotal</div>
                    <div className='col-span-1'>Action</div>
                  </div>
                </div>
              </div>
              <div className='mx-4 my-2 h-[440px] overflow-y-auto rounded-md bg-[#f8f8f8] shadow outline outline-1 outline-black/20 dark:bg-[#202020] dark:outline-white/20 '>
                {extendedTempPurchases.length > 0 ? (
                  extendedTempPurchases?.map((purchase, index) => (
                    <div
                      key={purchase.id}
                      className='border-b last:border-none hover:bg-[#efefef]  dark:hover:bg-[#101010]'
                    >
                      <div className='grid grid-cols-12 items-center rounded-sm p-4 text-center text-textDark first:mt-0 first:border-none  dark:text-textLight'>
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
                              to={`${path.home}${generateNameId({ name: purchase.item.name, id: purchase.item.id })}`}
                              className='flex flex-grow items-center'
                            >
                              <div className='flex h-24 w-24 flex-shrink-0 items-center'>
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
                                <div className='truncate text-base font-medium lg:text-lg'>{purchase.item.name}</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-4 items-center'>
                            <div className='col-span-1'>
                              <div className='flex items-center justify-center'>
                                <span className='text-sm font-semibold text-textDark dark:text-textLight lg:text-base'>
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
                              <span className='text-haretaColor'>
                                ${formatCurrency(purchase.item.price * purchase.quantity)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                className='bg-none text-xs text-textDark/80 hover:text-textDark hover:underline dark:text-textLight/80 dark:hover:text-textLight lg:text-sm'
                                onClick={handleRemove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
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
            <div className='sticky bottom-0 z-[5] grid grid-cols-12 items-center justify-between rounded-sm px-8 py-4 '>
              <div className='col-span-6 grid grid-cols-3'>
                <div className=' col-span-1 flex flex-shrink-0 items-center'>
                  {extendedTempPurchases.length > 0 && (
                    <Fragment>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-haretaColor'
                        checked={isAllChecked}
                        onChange={handleSelectAll}
                      />

                      <button
                        className='ml-2 appearance-none text-textDark ring-0 dark:text-textLight'
                        onClick={handleSelectAll}
                      >
                        Select all
                      </button>
                    </Fragment>
                  )}
                </div>
                <div className='col-span-1 flex items-center text-center text-textDark dark:text-textLight'>
                  {checkedPurchasesCount < 2
                    ? `${checkedPurchasesCount} item was selected`
                    : `${checkedPurchasesCount} items were selected`}
                </div>
              </div>
              <div className='col-span-6 grid grid-cols-4 items-center'>
                <div className='col-span-1'></div>

                <div className='col-span-1 items-center text-right font-medium uppercase text-textDark dark:text-textLight'>
                  Total:
                </div>
                <span className='col-span-1 text-center text-base font-medium text-brownColor dark:text-haretaColor lg:text-lg'>
                  ${formatCurrency(totalCheckedPurchasesPrice)}
                </span>
                <button
                  className={classNames(
                    'col-span-1 h-10 rounded-md border-none  bg-brownColor/80  text-textDark dark:bg-haretaColor  dark:text-textDark',
                    {
                      ' hover:bg-brownColor dark:hover:bg-haretaColor/80': checkedPurchasesCount !== 0,
                      'cursor-not-allowed bg-opacity-50 text-opacity-60 dark:bg-opacity-50 dark:text-opacity-60':
                        checkedPurchasesCount === 0
                    }
                  )}
                  disabled={checkedPurchasesCount === 0}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <UnauthenticatedCartMobile
          extendedTempPurchases={extendedTempPurchases}
          handleChecking={handleChecking}
          handleQuantity={handleQuantity}
          handleRemove={handleRemove}
          handleSearch={handleSearch}
          handleSelectAll={handleSelectAll}
          handleTypeQuantity={handleTypeQuantity}
        />
      )}
    </div>
  )
}
