import React, { Fragment, useContext } from 'react'

import { CartContext } from 'src/contexts/cart.context'
import { formatCurrency } from 'src/utils/utils'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import MobileItemInCart from '../MobileItemInCart'

interface Props {
  handleChecking: (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectAll: () => void
  handleRemove: (purchaseIndex: number) => () => void
  handleCheckout: () => void
}

export default function AuthenticatedCartMobile(props: Props) {
  const { handleChecking, handleRemove, handleSelectAll, handleCheckout } = props

  const { extendedPurchases } = useContext(CartContext)
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  return (
    <Fragment>
      <div className='relative'>
        <div className='text-darkText lg:text-lg dark:text-lightText grid grid-cols-12 rounded-md border border-black/20 bg-lightWhite900 px-4 py-2 text-base font-medium uppercase dark:border-white/20 dark:bg-darkGray900'>
          <div className='col-span-1'></div>
          <div className='col-span-6 text-center'>Product</div>
          <div className='col-span-4 text-center'>Price</div>
          <div className='col-span-1'></div>
        </div>
        <div className='my-2 h-[460px] overflow-auto overscroll-contain rounded-md border border-black/20 bg-lightWhite900 p-2 dark:border-white/20 dark:bg-darkGray900'>
          {extendedPurchases.length > 0 ? (
            extendedPurchases?.map((purchase, index) => (
              <div
                key={purchase.id}
                className='text-darkText dark:text-lightText mt-2 flex items-center rounded-lg border border-black/10 bg-lightWhite700 p-2 text-center first:mt-0 dark:border-white/10 dark:bg-darkGray700'
              >
                <MobileItemInCart
                  handleChecking={handleChecking}
                  handleRemove={handleRemove}
                  index={index}
                  purchase={purchase}
                />
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
        <div className='grid w-full grid-cols-12 items-center justify-between rounded-sm py-2 shadow'>
          <div className='col-span-1 flex flex-shrink-0 items-center'>
            {extendedPurchases.length > 0 && (
              <input
                name='all_are_selected'
                type='checkbox'
                className='h-5 w-5 accent-primaryColor'
                checked={isAllChecked}
                onChange={handleSelectAll}
              />
            )}
          </div>
          <div className='text-darkText dark:text-lightText col-span-1 flex items-center justify-center'>
            ({checkedPurchasesCount})
          </div>
          <div className='sm:text-base col-span-7 flex items-center justify-center space-x-2 text-sm font-medium'>
            <div className='text-darkText dark:text-lightText col-span-1 items-center text-right uppercase'>Total:</div>
            <span className='col-span-1 text-center font-medium text-primaryColor'>
              ${formatCurrency(totalCheckedPurchasesPrice)}
            </span>
          </div>
          {checkedPurchasesCount === 0 && (
            <div className='text-darkText sm:text-sm col-span-3 flex h-8 w-full cursor-not-allowed items-center justify-center rounded-md border-none bg-haretaColor text-center text-xs font-medium uppercase opacity-40'>
              Check out
            </div>
          )}
          {checkedPurchasesCount > 0 && (
            <Link
              to={path.shippingInfor}
              onClick={handleCheckout}
              className='text-darkText sm:text-sm col-span-3 flex h-8 w-full items-center justify-center rounded-md border-none bg-haretaColor text-center text-xs font-medium uppercase hover:bg-primaryColor'
            >
              Check out
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  )
}
