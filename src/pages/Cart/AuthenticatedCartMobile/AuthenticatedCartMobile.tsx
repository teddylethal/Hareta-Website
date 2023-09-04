import classNames from 'classnames'
import React, { Fragment, useContext } from 'react'

import { CartContext } from 'src/contexts/cart.context'
import { formatCurrency } from 'src/utils/utils'
import MobileItemInCart from '../MobileItemInCart'

interface Props {
  handleChecking: (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectAll: () => void
  handleRemove: (purchaseIndex: number) => () => void
}

export default function AuthenticatedCartMobile(props: Props) {
  const { handleChecking, handleRemove, handleSelectAll } = props

  const { extendedPurchases } = useContext(CartContext)
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.item.price * current.quantity
  }, 0)

  //? HANLDE ADD TO CART

  return (
    <Fragment>
      <div className='relative mx-2'>
        <div className='grid grid-cols-12 rounded-md border border-black/20 bg-[#f8f8f8] px-4 py-2 text-base font-medium uppercase text-textDark dark:border-white/20 dark:bg-[#202020] dark:text-textLight lg:text-lg'>
          <div className='col-span-1'></div>
          <div className='col-span-6 text-center'>Product</div>
          <div className='col-span-4 text-center'>Price</div>
          <div className='col-span-1'></div>
        </div>
        <div className='my-2 h-[460px] overflow-auto overscroll-contain rounded-md border border-black/20 bg-[#f8f8f8] p-2 dark:border-white/20 dark:bg-[#202020]'>
          {extendedPurchases.length > 0 ? (
            extendedPurchases?.map((purchase, index) => (
              <div
                key={purchase.id}
                className='mt-2 flex items-center rounded-lg border border-black/10 bg-[#efefef] p-2 text-center text-textDark first:mt-0 dark:border-white/10 dark:bg-[#101010] dark:text-textLight'
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
        <div className='grid w-full grid-cols-12 items-center justify-between rounded-sm px-2 py-2 shadow xl:mx-4'>
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
            <span className='col-span-1 text-center text-haretaColor'>
              ${formatCurrency(totalCheckedPurchasesPrice)}
            </span>
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
      </div>
    </Fragment>
  )
}
